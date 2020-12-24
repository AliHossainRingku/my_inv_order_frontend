<template>
  <div class="px-3 mt-3">
    <v-form 
      v-model="valid" 
      ref="form"
    >

    
      <v-row class="mt-n4">
        <v-col cols="6"
          ><label for="">Product Name <span class="red--text">*</span></label>
          <v-text-field
            v-model="item.name"
            :rules="rules.nameRules"
            dense
            outlined
            placeholder="Product Name"
            
          ></v-text-field
        ></v-col>
        <v-col cols="4">
          <label for="">Category <span class="red--text">*</span></label>
          <v-text-field
            v-model="itemCategoryName"
            dense
            outlined
            placeholder="Category"
            v-if="!changeCat"
            
          ></v-text-field>
          <v-text-field
          v-else
            v-model="selected_category_name"
            dense
            outlined
            placeholder="Category"
          ></v-text-field>
        </v-col>
        <v-col cols="2" class="text-left">
            <v-btn
              class="mr-1 mt-6"
              depressed
              elevation="4"
              color="primary"
              outlined
              
              @click="changeParentCategory = !changeParentCategory"
            >
             <v-icon small class="mr-1">mdi-pencil</v-icon>
              Edit
            </v-btn>
        </v-col>
      </v-row>
       <div  v-if="changeParentCategory">
      <v-row class="mt-n8">
        <v-col cols="12">
          <label for="">Select Category</label>

          <v-select
            v-model="category_id"
            :items="categories"
            dense
            item-text="name"
            item-value="id"
            outlined
            
            @change="changeCategory"
          >
          </v-select>
        </v-col>
      </v-row>
      <!--  -->

      
      <div v-for="(item,index) in subCategoryArray" :key="index">
        <SubCategory
          :SubCategories="item"
          :index="index"
          @changeSubCategory="changeSubCategory"
        />
      </div>
      </div>

      <v-row class="mt-n9">
        <v-col cols="6">
          <label for="">Brand <span class="red--text">*</span></label>
          <v-select
            v-model="item.brand_id"
            :items="brands"
            item-text="name"
            item-value="id"
            :rules="rules.brandRules"
            dense
            outlined
            placeholder="Select Brand"
            
          >
          </v-select>
        </v-col>
        <v-col cols="6">
          <label for="">Price <span class="red--text">*</span></label>
          <v-text-field
           v-model="item.price"
            :rules="rules.priceRules"
            dense
            outlined
            placeholder="Price"
            
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-n9">
        <v-col cols="6">
          <label for="">Vat (%  )</label>
          <v-text-field
           v-model="item.vat"
            dense
            outlined
            placeholder="vat"
            
          ></v-text-field
        ></v-col>
        <v-col cols="6">
          <label for="">Details </label>
          <v-textarea
          v-model="item.details"
            dense
            outlined
            name="input-7-4"
            rows="1"
            row-height="15"
          ></v-textarea
        ></v-col>
      </v-row>
      <v-row class="mt-n9">
        <v-col cols="6"
          ><label for="">Product Image</label>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            dense
            outlined
            v-model="item.images"
            placeholder="Upload A Product Image"
            prepend-icon=""
            @change="onImageChange"
          ></v-file-input
        ></v-col>
        <v-col cols="6"
          ><label for="">Thumbnail Image</label>
          <v-file-input
            v-model="thumbnail"
            accept="image/png, image/jpeg, image/bmp"
            dense
            outlined
            placeholder="Upload A Thumbnail Image"
            prepend-icon=""
            @change="onThumbnailChange"
          ></v-file-input
        ></v-col>
      </v-row>

    </v-form>

    <v-card-actions>
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn 
        color="green darken-1" 
       
        text 
        @click="onClickUpdate"
      >
        Update
      </v-btn>
      <slot name="closeBtn"></slot>
    </v-card-actions>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { rules } from "@/data/rules.js";
export default {
  name: "EditProduct",
  components: {
    
  },
  props: {
    item: {
      required: true
    },
       categories: {
      required: true
    },
    brands: {
      required: true
    },
   
     itemCategoryName:{
      required: false
    }
  },
  data() {
    return {
      images:'',
      thumbnail:'',
      category_id:'',
      selected_category_id :'',
      selected_category_name :'',
      subCategoryArray:[],
      changeParentCategory: false,
      product: {
          name: '',
          category_id :'',
          brand_id: '',
          price: '',
          vat: '',
          details: '',
          thumbnail: '',
          images: '',
          store_id: '',
          quantity: '',
        },
      loading: false,
      valid: false,
      changeCat: false,
      files: [],
      logo: ''
    };
  },
  computed: {
    rules() {
      return rules;
    },
    sellerId() {
      return this.$route.params.id;
    },
     SubCategories(){
       return this.$store.state.category.subCategory;
    }
  },
  methods: {
     ...mapActions([
      "getSubCategory",
    ]),
    onClickUpdate() {
      this.$refs.form.validate();

      if(this.$refs.form.validate()){
        var formData = new FormData();

       
        formData.append('name',  this.item.name);
        formData.append('category_id',  (this.selected_category_id == '' || this.selected_category_id==null)?this.item.category_id:this.selected_category_id);
        formData.append('brand_id',  this.item.brand_id);
        formData.append('price',  this.item.price);
        formData.append('vat',  this.item.vat ?? '');
        formData.append('details',  this.item.details ?? '');
        // if ( this.item.thumbnail == null ) {
        //    this.item.thumbnail ='';
        // }
        if(this.thumbnail == null || this.thumbnail == ""){
          formData.append('thumbnail',  '' );
        }else{
          formData.append('thumbnail',  this.thumbnail );
        }
        formData.append('images',  this.images);
        
        //   this.item.seller_ids.forEach((item,index) => {
        //     console.log(index, item);
        // });
        formData.append(`seller_ids[0]`, this.sellerId);
        let data = {
              sellerId: this.sellerId,
               itemId: this.item.id,
              formData: formData
              }
          formData.append('_method',  'put');

        // console.log(this.item.vat,'vat');
        // console.log(this.item.thumbnail,'thumbnail');
        // console.log(this.item.images,'images');
        this.$emit('onUpdate', data);
        this.loadingHandle(true);
      
      }
    },
     // getting subcategory while changing the category
    async changeCategory() {
      let data = {
        sellerId: this.sellerId,
        categoryId: this.category_id,
      }
      this.$emit('changeCategory', data);
      this.loadingHandle(true);
      let res =  await this.getSubCategory(data);
      this.count = 0;
      this.subCategoryArray=[];
      let catInfo =  this.SubCategories
      if (res.success) {
        this.subCategoryArray.push(catInfo)
      }
      this.selected_category_id = data.categoryId;
      this.loading = false
    },

    // getting subcategory while changing a subcategroy
    async changeSubCategory(data) {
      this.subCategoryArray.splice(data.index+1);
      let res =  await this.getSubCategory(data);
      let catInfo = this.SubCategories
      this.$emit('changeCategory', data);
      if (res.success) {
        this.subCategoryArray.push(catInfo);
      }
      this.selected_category_id = data.categoryId;
      this.loading = false
    },
   resetValidation() {
      this.$refs.form.resetValidation();
    },
     
    emptyForm(){
      this.item.name = 
      this.item.category_id =  
      this.item.brand_id =  
      this.item.price = 
      this.item.vat =  
      this.item.details =  
      this.item.thumbnail =  
      this.item.images =  
      this.item.store_id = 
      this.item.quantity =  
      this.category_id = '';
      this.thumbnail =  
      this.images =  
      this.selected_category_name =   "";
      this.selected_category_id =  null;
      this.subCategoryArray= [];
      this.changeParentCategory = false
      this.changeCat = false
    },
    loadingHandle(value) {
      this.loading = value
    },
    onThumbnailChange(e) {
      if(e == undefined){
        this.thumbnail = '';
        return;
      }
      this.thumbnail = e;
    },
    onImageChange(e) {
      if(e == undefined){
        this.images = '';
        return;
      }
      this.images = e;
    },

    //  changeCategory() {
    //     let data = {
    //           sellerId: this.sellerId,
    //           categoryId: this.item.category_id
    //           }
    //     this.$emit('changeCategory', data);
    //     this.loadingHandle(true);
    // },
  },
  mounted(){
     this.item.thumbnail =  '';
        this.item.images =  '';
  }

};
</script>