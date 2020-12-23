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
          placeholder="Category Name"
          required
        ></v-text-field>
      </v-col>
    </v-row>
      <v-row class="mt-n8">
        <v-col cols="8">
          <label for="">Parent Category</label>
          <v-text-field
            v-model="parentCategoryName"
            dense
            outlined
            placeholder="Parent Category"
            v-if="!changeCat"
            
          ></v-text-field>
          <v-text-field
          v-else
            v-model="selected_category_name"
            dense
            outlined
            placeholder="Parent Category"
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="text-left">
            <v-btn
              class="mr-1 mt-6"
              depressed
              elevation="4"
              color="primary"
              outlined
              block
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
          <label for="">Select Parent Category</label>

          <v-select
            v-model="category_id"
            :items="categories"
            dense
            item-text="name"
            item-value="id"
            outlined
            required
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

      <v-row class="mt-n8">
        <v-col cols="12">
          <label for="">Icon</label>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            dense
            outlined
            placeholder="Upload A icon"
            prepend-icon=""
            @change="onFileChange"
          ></v-file-input>
        </v-col>
      </v-row>
      
    </v-form>

    <v-card-actions>
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn 
        color="green darken-1" 
        text
        :loading="loading"
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
import SubCategory from "@/components/molecule/category/SubCategory";
import { rules } from "@/data/rules.js";
export default {
  name: "EditCategory",
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
    parentCategoryName:{
      required: false
    }
  },
  data() {
    return {
      category_id:'',
      selected_category_id :'',
      selected_category_name :'',
      subCategoryArray:[],
      loading: false,
      valid: false,
      changeParentCategory: false,
      changeCat: false,
      files: [],
      icon: ''
    };
  },
  computed: {
    rules() {
      return rules;
    },
    sellerId(){
      return this.$route.params.id;
    },
     SubCategories(){
       return this.$store.state.category.subCategory;
    },
    
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
        let parent_id =  this.selected_category_id ?this.selected_category_id: this.item.parent_id;
        parent_id = parent_id==null?'':parent_id;

        formData.append('parent_id', parent_id);
        formData.append('icon', this.icon ?? "");
        formData.append('_method',  'put');

        let data = {
          sellerId: this.sellerId,
          categoryId: this.item.id,
          formData: formData
        }

        this.$emit('onUpdate', data);
        this.loadingHandle(true);
      }
    },

    
    // getting subcategory while changing the category
    async changeCategory(e) {
      let categoryName  =  this.categories.filter(i => i.id == e)[0].name;
      let data = {
        sellerId: this.sellerId,
        categoryId: this.category_id,
      }
      this.loadingHandle(true);
      let res =  await this.getSubCategory(data);
      this.count = 0;
      this.subCategoryArray=[];
      let catInfo =  this.SubCategories
      if (res.success) {
        this.subCategoryArray.push(catInfo)
      }
      this.selected_category_id = data.categoryId;
      this.selected_category_name = categoryName;
      this.loadingHandle(false);
      this.changeCat = true;
    },

    // getting subcategory of a subcategory while canging it
    async changeSubCategory(data) {
      console.log(data);
      this.subCategoryArray.splice(data.index+1);
      let res =  await this.getSubCategory(data);
      let catInfo = this.SubCategories
      if (res.success) {
        this.subCategoryArray.push(catInfo);
      }
      this.selected_category_id = data.categoryId;
      this.selected_category_name = data.categoryName;
      this.changeCat = true;
      this.loadingHandle(false);
    },
     
    emptyForm(){
      this.item.name = 
      this.item.parent_id =  
      this.icon =   
      this.category_id =   
      this.selected_category_name =   "";
      this.selected_category_id =  null;
      this.files= [];
      this.subCategoryArray= [];
      this.changeParentCategory = false
      this.changeCat = false
    },
    loadingHandle(value) {
      this.loading = value
    },

     onFileChange(e) {
      if(e == undefined){
        this.icon = '';
        return;
      }
      this.icon = e;
    }
  },

};
</script>