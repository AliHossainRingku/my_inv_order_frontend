<template>
  <div class="px-3 mt-3">
    <v-form 
      v-model="valid" 
      ref="form"
    >
    <v-row class="mt-n4">
      <v-col cols="12">
      <label for="">Name <span class="red--text">*</span></label>
      <v-text-field
        v-model="item.name"
        :rules="rules.nameRules"
        dense
        outlined
        placeholder="seller Name"
      ></v-text-field>
      </v-col>
    </v-row>

    <div v-if="choose">
      <v-row class="mt-n8">
        <v-col cols="12">
          <label for="" class="mt-n2">Category</label>
          <v-select
          
            v-model="category_id"
            :items="categories"
            dense
            item-text="name"
            item-value="id"
            outlined
            placeholder="Select Category"
            @change="changeCategory"
          >
          </v-select>
        </v-col>
      </v-row>

      <div v-for="(item,index) in subCategoryArray" :key="index">  
        <SubCategory
          :SubCategories="item"
          :index="index"
          @changeSubCategory="changeSubCategory"
        />
      </div>

      <v-row class="mt-n10 mb-5">
        <v-col cols="12">
          <v-btn
            small
            
            color="green"
            class="mt-1 text-capitalize white--text"
            @click="chooseCategory"
            
          >
            Add Category
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-row class="mt-n8">
      <v-col cols="9">
        <v-chip
          class="ma-1 text-capitalize"
          close
          small
          color="green"
          outlined
          v-for="(selectedCategory,selectedCatIndex) in selectedCats" :key="selectedCatIndex"
          @click:close="cancelCategory(selectedCatIndex)"
        >
          {{selectedCategory.name}}
        </v-chip>
      </v-col>

      <v-col cols="3" class="text-right">
        <v-btn
          small
          outlined
          color="primary"
          class="mt-1 text-capitalize"
          @click="choose=true"
         v-if="!choose"
        >
          <v-icon small class="mr-1">mdi-plus</v-icon>
          Add More
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-n5">
      <v-col cols="12">
      <label for="">Icon</label>
      <v-file-input
        v-model="files"
         accept="image/png, image/jpeg, image/bmp"
        dense
        outlined
        placeholder="Upload A Icon"
      
        @change="onFileChange"
       prepend-icon=""
      ></v-file-input>
      </v-col>
    </v-row>
      
      <!-- show uploaded icon -->
      <v-row class="mt-n6">
        <v-col cols="4" class="mt-4">
          Uploaded Icon:
          </v-col>
        <v-col cols="8" class="ml-n8">
          <img 
          :src="`http://127.0.0.1:8000/storage/${item.icon}`" 
          alt="Not Uploaded" 
          height="60" 
          width="60"
          style="border: 2px solid #bfbfbf"
          ></v-col>
      </v-row>
      <!-- <div><span style="margin-top:-10px"></span> <span style="margin-bottom:100px"></span></div> -->
    </v-form>

    <v-card-actions>
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn 
        color="green darken-1" 
        :loading="loading"
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
import SubCategory from "@/components/molecule/brand/SubCategory";

export default {
  name: "EditBrand",
  components: {
      SubCategory
  },
  props: {
    item: {
      required: true
    },
    categories: {
        required: true
    },
    selectedCategories: {
        required: true
    },
  },
  data() {
    return {
      selectedCategoryId:'',
      category_id:'',
      selectedCategoryName:'',
      subCategoryArray:[],
      selectedCats:[],
      loading: false,
      valid: false,
      choose: false,
      files: [],
      logo: '',
      ids:[]
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
  watch:{
    selectedCategories(){
      this.selectedCats = this.selectedCategories;
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
        formData.append('status',  this.item.status);

         this.selectedCats.forEach((item,index) => {
          formData.append(`category_ids[${index}]`, item.id);
        });

        formData.append('_method',  'put');
        if(this.logo){
          formData.append('logo', this.logo);
        }
         let data = {
              sellerId: this.sellerId,
              itemId: this.item.id,
              formData: formData
              }

        this.$emit('onUpdate', data);
        this.loadingHandle(false);
      }
    },

    
    // getting subcategory of parent category
    async changeCategory(e) {
      let categoryName  =  this.categories.filter(i => i.id == e)[0].name;
      let data = {
        sellerId: this.sellerId,
        categoryId: this.category_id,
      }
      this.loadingHandle(false);
      let res =  await this.getSubCategory(data);
      this.count = 0;
      this.subCategoryArray=[];
      let catInfo =  this.SubCategories
      if (res.success) {
        this.subCategoryArray.push(catInfo)
        this.selectedCategoryId = data.categoryId;
        this.selectedCategoryName = categoryName;
      }
    },

  // getting subcategory of a subcategory while the subcategory is changing
  async changeSubCategory(data) {
      this.subCategoryArray.splice(data.index+1);
      let res =  await this.getSubCategory(data);
      let catInfo = this.SubCategories
      if (res.success) {
        this.subCategoryArray.push(catInfo)
        this.selectedCategoryId = data.categoryId;
        this.selectedCategoryName = data.categoryName;
      }
    },

    // while press on choose category button then the choosen categori is added to the selected category list
    chooseCategory(){
        if (this.selectedCategoryName != '' && this.selectedCategoryId!= '') {
          let selected = false;
          this.selectedCats.forEach(element => {
            if (element.id == this.selectedCategoryId) {
              selected = true;
              this.category_id='';
              this.subCategoryArray=[];
              let snackbarData =[{snackbar:true, text:"Category already selected"}];
              this.$emit('snackbarEvent',snackbarData)
            }
          });
          if (!selected) {
            this.subCategoryArray=[];
            this.category_id = '';
            this.selectedCats.push({id: this.selectedCategoryId,name:this.selectedCategoryName});
          }
        }
        this.choose=false;
         this.category_id ='';
    },

    // while pressed the cross button of choosen category list, it will vanish the category from selected list
    cancelCategory(selectedCatIndex){
      this.selectedCats.splice(selectedCatIndex, 1);
    },


   
    emptyForm(){
      this.files = [];
      // this.brand.category_ids = [];
      this.selectedCategories = [];
      this.selectedCats = [];
      this.choose = false;
    //   console.log(this.logo, 'dsd')
    },

    loadingHandle(value) {
      this.loading = value
    },

    onFileChange(e) {
    //   console.log(e)
      if(e == undefined){
        this.logo = '';
        return;
      }
      this.logo = e;
    }
  },
  created(){
    
    this.selectedCats = this.selectedCategories;
  }

};
</script>