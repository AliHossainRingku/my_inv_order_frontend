<template>
  <div class="px-3 mt-3">
    <v-form v-model="valid" ref="form">

      <v-row class="mt-n5">
        <v-col cols="12">
          <label for="">Name <span class="red--text">*</span></label>
          <v-text-field
            v-model="category.name"
            :rules="rules.nameRules"
            dense
            outlined
            placeholder="Category Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      
      <v-row class="mt-n8">
        <v-col cols="12">
          <label for="">Parent Category</label>
          <v-select
            v-model="category_id"
            :items="categories"
            dense
            item-text="name"
            item-value="id"
            @change="changeCategory"
            outlined
            placeholder="Parent Category"
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

      <v-row class="mt-n8">
        <v-col cols="12">
          <label for="">Logo</label>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            dense
            outlined
            placeholder="Upload A Logo"
            prepend-icon=""
            @change="onFileChange"
          ></v-file-input>
        </v-col>
      </v-row>

    </v-form>

    <v-card-actions>
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" :loading="loading" outlined text @click="onClickCreate">
        Create
      </v-btn>
      <slot name="closeBtn"></slot>
    </v-card-actions>

  </div>
</template>

<script>
import { mapActions } from "vuex";
import { rules } from "@/data/rules.js";
import SubCategory from "@/components/molecule/category/SubCategory";
export default {
  name: "CreateCategory",
  components: {
     SubCategory
  },
  
  props: {
    categories: {
        required: true
      }
  },
  data() {
    return {
      category_id:'',
      selected_category_id :'',
      subCategoryArray:[],
      loading: false,
      category: {
        name: '',
        icon: '',
        parent_id: ''
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
      if(this.$refs.form.validate()){
        var formData = new FormData();
        formData.append('icon', this.category.icon);
        formData.append('name',  this.category.name);
        formData.append('parent_id',  this.selected_category_id);
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
      this.loadingHandle(false);
    },

    // getting subcategory of a subcategory while canging it
    async changeSubCategory(data) {
      this.subCategoryArray.splice(data.index+1);
      let res =  await this.getSubCategory(data);
      let catInfo = this.SubCategories
      if (res.success) {
        this.subCategoryArray.push(catInfo);
      }
      this.selected_category_id = data.categoryId;
      this.loadingHandle(false);
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },

    emptyForm(){
      this.category.icon = 
      this.category.name = 
      this.category.parent_id = 
      this.category_id = 
      this.selected_category_id = '';
      this.subCategoryArray=[];
    },

    loadingHandle(value) {
      this.loading = value
    },

    onFileChange(e) {
      console.log(e)
      if(e == undefined){
        this.category.icon = '';
        return;
      }
      this.category.icon = e;
    }
  },
};
</script>