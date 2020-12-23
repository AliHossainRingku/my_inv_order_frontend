<template>
  <div>
    <v-row class="mx-2 mt-n4"  >
      <v-col cols="7" class=" blue--text">
        <span class="green--text mr-1"  v-if="selectedCat.length>0">Selected Category: </span>
        <span v-for="(item,i) in selectedCat" :key="i" class="text-capitalize">
          <a>
            <span class="mr-1" @click="changeSelectedCat(i)"> {{item.text}}</span>
          </a>
          <span v-if="selectedCat.length-1 != i" class="ma-1">/ </span>
          <span> </span>
        </span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="5" class="text-right" >Price range: {{price[0]}} To {{price[1]}}</v-col>
    </v-row>

    <v-row class="mx-1 my-n2 mb-n8">
      <v-col cols="1" class="mr-3">
        <v-tooltip top>
         <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
          color="#4CAF"
          text
          class="text-capitalize"
          elevation="0"
          @click="filterProd"
        >
          {{filterText}}
          <v-icon>mdi-filter</v-icon>
        </v-btn>
         </template>
                <span>{{!checkFilter?"Advance Filter:  Using Category,Brand & Store":"Reset Advance Filter & Get All Product"}} </span>
              </v-tooltip>
      </v-col>

      <v-col 
        cols="2" 
        class="md" 
        v-if="filterCategory"
      >
        <v-select
          v-model="categoryId"
          :items="selectCategories"
          item-text="name"
          item-value="id"
          dense
          @change='changeCategory'
          outlined
          placeholder="Category"
          required
          class="text-capitalize"
        >
        </v-select>
      </v-col>

      <v-col 
        cols="2" 
        class="ml-n3" 
        v-if="filterBrand"
      >
        <v-select
          v-model="brandId"
          :items="allBrands"
          item-text="name"
          item-value="id"
          dense
          outlined
          placeholder="Brand"
          required
        >
        </v-select>
      </v-col>
      <v-col 
        cols="2" 
        class="ml-n3" 
        v-if="filterStore"
      >
        <v-select
          v-model="storeId"
          :items="stores"
          item-text="name"
          item-value="id"
          dense
          outlined
          placeholder="Store"
          required
        >
        </v-select>
      </v-col>

      <v-col 
        cols="1" 
        class="ml-n3" 
        v-if="filterButton"
      >
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="#4CAF" 
              class="text-capitalize" 
              elevation="0" 
              dark
              @click="onClickFilterNow"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
         </template>
          <span>Filter Product ?</span>
        </v-tooltip>
      </v-col>

      <v-spacer></v-spacer>

      <v-col cols="2" >
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs"
              v-on="on">
            <v-range-slider
              v-model="price"
              :max="max"
              :min="min"
              hide-details
              class="align-right"
              track-color="#4CAF"
              @change="onChangePriceRange"
            >
            
            </v-range-slider>
            </div>
          </template>
          <span>Choose Price Range For Filtering Product</span>
        </v-tooltip>
      </v-col>

      <v-col  cols="2">
        <v-text-field
        v-model="productName"
          dense
          outlined
          placeholder="Search Product"
          @change="onChangeProductName"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { rules } from "@/data/rules.js";
import { mapActions } from "vuex";

export default {
  name: "filterPage",

  components: {},

  props: {
   products:{
     required : true
   }
  },



  data() {
    return {
      categoryId:'',
      brandId:'',
      storeId:'',
      productName:'',
      selectCategories:[],
      price:[0,0],
      min: 0,
      max: 0,
      filterText:"Filter",
      checkFilter: false,
      filterCategory: false,
      filterBrand: false,
      filterStore: false,
      filterMoney: false,
      filterButton: false,
      allBrands:[],
      selectedCat: [],
    };
  },

  computed: {
     categoriesWithParent() {
      return this.$store.state.category.categoriesWithParent;
    },
     categories() {
      return this.$store.state.category.categories;
    },
    sellerId() {
      return this.$route.params.id;
    },
    brands() {
      return this.$store.state.brand.brands;
    },
    stores() {
      return this.$store.state.store.stores;
    },
    categoryDependentbrands() {
      return this.$store.state.brand.categoryDebendentBrands;
    },
    minPrice(){
      let minPrice =  90000000 ;
      this.products.forEach(element => {
         if (minPrice > element.price) {
           minPrice = element.price;
         }
        
      });
      return minPrice;
    },
    maxPrice(){
      let maxPrice =  0 ;
      this.products.forEach(element => {
         if (maxPrice < element.price) {
           maxPrice = element.price;
         }
        
      });
      return maxPrice;
    }
  },

  watch: {
      products(){
        this.price[0] = this.minPrice
        this.min = this.minPrice;
        this.price[1] = this.maxPrice
        this.max = this.maxPrice;

      }
  },

  methods: {
    ...mapActions([
        "allCategoriesWithParent", 
        "allBrand",
        "allStore",
        "allCategory",
        "getSubCategory",
        "categoryDependentBrand",
    ]),
    async changeCategory(e) {
      this.brandId = "";
      this.allBrand=[];
      let data = {
          sellerId: this.sellerId,
          categoryId: this.categoryId,
      }
      await this.getSubCategory(data);
      await this.categoryDependentBrand(data);
      this.allBrands = this.$store.state.brand.categoryDebendentBrands;
      this.selectCategories = this.$store.state.category.subCategory;
      let categoryName =  this.categoriesWithParent.filter(i => i.id == e)[0].name;
      // console.log(categoryName);
      this.selectedCat.push({id:this.categoryId,text:categoryName})
    },
   async changeSelectedCat(index){
      this.categoryId = this.selectedCat[index].id;
         let data = {
            sellerId: this.sellerId,
            categoryId: this.categoryId,
        }
        await this.getSubCategory(data);
        await this.categoryDependentBrand(data);
        this.allBrands = this.$store.state.brand.categoryDebendentBrands;
        this.selectCategories = this.$store.state.category.subCategory;
        // .splice(data.index+1);
        this.selectedCat.splice(index+1);

    },
    onChangeProductName(){
      let  queryString ="search="+this.productName;

      this.$emit("getFilteredProduct",queryString)
    },
    onClickFilterNow(){
      
      let queryString ="";
      if (this.categoryId && this.brandId && this.storeId) {
        queryString +="category_id="+this.categoryId+"&brand_id="+this.brandId+"&store_id="+this.storeId;
      }else if (this.categoryId && this.brandId) {
        queryString +="category_id="+this.categoryId+"&brand_id="+this.brandId;
      }else if(this.categoryId &&  this.storeId){
        queryString +="category_id="+this.categoryId+"&store_id="+this.storeId;
      }else if(this.brandId && this.storeId){
        queryString +="brand_id="+this.brandId+"&store_id="+this.storeId;
      }else if(this.categoryId){
        queryString +="category_id="+this.categoryId;
      }else if(this.brandId){
        queryString +="brand_id="+this.brandId;
      }else if(this.storeId){
        queryString +="store_id="+this.storeId;
      }

      // queryString +="&price_range="+this.price[0]+","+this.price[1];
      this.$emit("getFilteredProduct",queryString)
    },
    onChangePriceRange(){
      let  queryString ="price_range="+this.price[0]+","+this.price[1];
      this.$emit('getFilteredProduct',queryString)
    },

    filterProd() {
      this.checkFilter = !this.checkFilter
      this.selectCategories = this.categories;

      if (!this.checkFilter) {
          this.allBrands = this.brands;
          this.selectCategories = this.categories;
          this.$emit('resetFilter');
          this.filterText = 'Filter';
          this.selectedCat=[];
      }else{
          this.filterText = 'reset';
      }
      this.brandId = this.categoryId = this.storeId ="";
      setTimeout(() => {
        this.filterCategory = !this.filterCategory;
      }, 50);
      setTimeout(() => {
        this.filterBrand = !this.filterBrand;
      }, 100);
      setTimeout(() => {
        this.filterStore = !this.filterStore;
      }, 150);
      setTimeout(() => {
        this.filterButton = !this.filterButton;
      }, 200);
    },
  },
  created(){
      this.allBrands = this.brands;
      this.selectCategories = this.categories;
      this.price[0] = this.minPrice
      this.min = this.minPrice;
      this.price[1] = this.maxPrice
      this.max = this.maxPrice;

  },
    mounted() {
    this.allCategoriesWithParent(this.sellerId);
    this.allBrand(this.sellerId);
    this.allCategory(this.sellerId);
    this.allStore(this.sellerId);
  },
};
</script>