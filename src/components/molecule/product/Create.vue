<template>
  <div class="px-3 mt-3">
    <v-form v-model="valid" ref="form">

      <v-row class="mt-n4">
        <v-col cols="6">
          <label for="">Product Name <span class="red--text">*</span></label>
          <v-text-field
            v-model="product.name"
            :rules="rules.nameRules"
            dense
            outlined
            placeholder="Product Name"
            required
          ></v-text-field
        ></v-col>
        <v-col cols="6">
          <label for="">Category <span class="red--text">*</span></label>
          <v-select
            v-model="product.category_id"
            :items="categories"
            item-text="name"
            item-value="id"
            :rules="rules.categoryRules"
            @change="changeCategory"
            dense
            outlined
            placeholder="Select Category"
            required
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
      <v-row class="mt-n9">
        <v-col cols="6">
          <label for="">Brand <span class="red--text">*</span></label>
          <v-select
            v-model="product.brand_id" value="5"
            :items="brands"
            item-text="name"
            item-value="id"
            :rules="rules.brandRules"
            dense
            outlined
            placeholder="Select Brand"
            required
          >
          </v-select>
        </v-col>
        <v-col cols="6">
          <label for="">Price <span class="red--text">*</span></label>
          <v-text-field
           v-model="product.price"
            :rules="rules.priceRules"
            dense
            outlined
            placeholder="Price"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-n9">
        <v-col cols="6">
          <label for="">Vat (%  )</label>
          <v-text-field
            v-model="product.vat"
            :rules="rules.vatRules"
            dense
            outlined
            placeholder="vat"
            required
          ></v-text-field
        ></v-col>
        <v-col cols="6">
          <label for="">Details </label>
          <v-textarea
          v-model="product.details"
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
            placeholder="Upload A Product Image"
            prepend-icon=""
            @change="onImageChange"
          ></v-file-input
        ></v-col>
        <v-col cols="6"
          ><label for="">Thumbnail Image</label>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            dense
            outlined
            placeholder="Upload A Thumbnail Image"
            prepend-icon=""
            @change="onThumbnailChange"
          ></v-file-input
        ></v-col>
      </v-row>

      <h4 style="color: #009900" class="mt-n4">Stock Product (Optional)</h4>

      <div style="border-bottom: 2px solid #009900" class="my-2"></div>
      <v-row class="mt-n2">
        <v-col cols="6">
          <label for="">Store </label>
          <v-select
          v-model="product.store_id"
            :items="stores"
            item-text="name"
            item-value="id"
            dense
            outlined
            placeholder="Select Store"
            required
          >
          </v-select
        ></v-col>
        <v-col cols="6">
          <label for="">Quantity </label>
          <v-text-field
          v-model="product.quantity"
            dense
            outlined
            placeholder="Quantity"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <v-card-actions class="mt-n3">
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text :loading="loading"  @click="onClickCreate"> Create </v-btn>
      <slot name="closeBtn"></slot>
    </v-card-actions>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { rules } from "@/data/rules.js";
import SubCategory from "@/components/molecule/product/SubCategory";
export default {
  name: "CreateProduct",

  components: {
    SubCategory
  },

  props: {
    categories: {
      required: true
    },
    brands: {
      required: true
    },
    stores: {
      required: false
    },
  },

  data() {
    return {
      selected_category_id :'',
      subCategoryArray:[],
       loading: false,
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
        valid: false,
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

  watch: {},

  methods: {
    ...mapActions([
      "getSubCategory",
    ]),
    
    // Form submission
    onClickCreate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        var formData = new FormData();
   
        formData.append('name',  this.product.name);
        formData.append('category_id',  this.selected_category_id);
        formData.append('brand_id',  this.product.brand_id);
        formData.append('price',  this.product.price);
        formData.append('vat',  this.product.vat);
        formData.append('details',  this.product.details);
        formData.append('thumbnail',  this.product.thumbnail);
        formData.append('images',  this.product.images);
        formData.append('store_id',  this.product.store_id);
        formData.append('quantity',  this.product.quantity);
        formData.append(`seller_ids[0]`, this.sellerId);
        let data = {
          sellerId: this.sellerId,
          formData: formData
        }
        this.$emit('onCreate', data);
        this.loadingHandle(true);
      }
    },

    // getting subcategory while changing the category
    async changeCategory() {
      let data = {
        sellerId: this.sellerId,
        categoryId: this.product.category_id,
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
       this.product.name = 
        this.product.category_id =  
        this.product.brand_id =  
        this.product.price = 
        this.product.vat =  
        this.product.details =  
        this.product.thumbnail =  
        this.product.images =  
        this.product.store_id = 
        this.product.quantity =  
        this.selected_category_id = '';
    },

    loadingHandle(value) {
      this.loading = value
    },

    onThumbnailChange(e) {
      if (e == undefined) {
        this.product.thumbnail = '';
        return;
      }
    },

    onImageChange(e) {
      if(e == undefined){
        this.product.mages = '';
        return;
      }
      this.product.mages = e;
    }
  },
  
};
</script>