<template>
  <div class="px-3 mt-3">
    <v-form v-model="valid" ref="form">

      <v-row class="mt-n4">
        <v-col cols="12">
          <label for="">Brand Name <span class="red--text">*</span></label>
          <v-text-field
            v-model="brand.name"
            :rules="rules.nameRules"
            dense
            outlined
            placeholder="Brand Name"
          ></v-text-field>
        </v-col>
      </v-row>
   
      <v-row class="mt-n9">
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

    <v-row class="mt-n8">
      <v-col cols="9">
        <v-chip
          class="ma-1 text-capitalize"
          close
          small
          color="green"
          outlined
          v-for="(selectedCategory,selectedCatIndex) in selectedCategories" :key="selectedCatIndex"
          @click:close="cancelCategory(selectedCatIndex)"
        >
          {{selectedCategory.name}}
        </v-chip>
      </v-col>
      <v-col cols="3" class="text-right">
        <v-btn
         x-small
         outlined
          color="warning"
          class="mt-1 text-capitalize"
          @click="chooseCategory"
        >
          Choose Category
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-n4">
      <v-col cols="12">
        <label for="" class="mt-n2">Icon</label>
        <v-file-input
        v-model="icon"
          accept="image/png, image/jpeg, image/bmp"
          dense
          outlined
          placeholder="Upload A Icon"
          prepend-icon=""
          @change="onFileChange"
        ></v-file-input>
      </v-col>
    </v-row>
   
    </v-form>

    <v-card-actions>
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text  @click="onClickCreate"> Create </v-btn>
      <slot name="closeBtn"></slot>
    </v-card-actions>

  </div>
</template>

<script>
import { mapActions } from "vuex";
import { rules } from "@/data/rules.js";
import SubCategory from "@/components/molecule/brand/SubCategory";
export default {
  name: "CreateBrand",
  components: {
    SubCategory
  },
  props: {
    categories: {
        required: true
      },
      
  },
  data() {
    return {
      icon:'',
      selectedCategoryId:'',
      category_id:'',
      selectedCategoryName:'',
      subCategoryArray:[],
      selectedCategories:[],
      loading: false,
      brand: {
        name: '',
        icon: '',
        category_ids: [],
        seller_id: ''
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

    // form submission
    onClickCreate() {
      this.$refs.form.validate();
      if(this.$refs.form.validate()){
        var formData = new FormData();
        formData.append('icon', this.icon);
        formData.append('name',  this.brand.name);
        this.selectedCategories.forEach((item,index) => {
          formData.append(`category_ids[${index}]`, item.id);
        });
        let data = {
          sellerId: this.sellerId,
          formData: formData
        }
        this.$emit('onCreate', data);
        this.loadingHandle(true);
      }
    },

    // getting subcategory of parent category
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
          this.selectedCategories.forEach(element => {
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
            this.selectedCategories.push({id: this.selectedCategoryId,name:this.selectedCategoryName})
          }
        }
        this.category_id ='';
    },

    // while pressed the cross button of choosen category list, it will vanish the category from selected list
    cancelCategory(selectedCatIndex){
      this.selectedCategories.splice(selectedCatIndex, 1);
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },

    emptyForm(){
      this.icon = this.brand.name = this.brand.seller_id = '';
      this.brand.category_ids = [];
      this.selectedCategories = [];
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