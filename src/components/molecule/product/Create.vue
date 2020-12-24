<template>
  <div class="px-3 mt-3">
    <v-form v-model="valid" ref="form">

      <v-row class="mt-n4">
        <v-col cols="12">
          <label for="">Product Name <span class="red--text">*</span></label>
          <v-text-field
            v-model="product.product_name"
            :rules="rules.nameRules"
            dense
            outlined
            placeholder="Product Name"
            required
          ></v-text-field
        ></v-col>
      </v-row>
      <v-row class="mt-n9">

        <v-col cols="6">
          <label for="">Price <span class="red--text">*</span></label>
          <v-text-field
           v-model="product.product_price"
            :rules="rules.priceRules"
            dense
            outlined
            placeholder="Price"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <label for="">Quantity <span class="red--text">*</span></label>
          <v-text-field
          v-model="product.quantity"
            dense
            outlined
            placeholder="Quantity"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="mt-n9">
          <label for="">Description </label>
          <v-textarea
          v-model="product.product_description"
            dense
            outlined
            name="input-7-4"
            rows="1"
            row-height="15"
          ></v-textarea
        ></v-col>
      </v-row>

      <v-row class="mt-n9">
        <v-col cols="12"
          ><label for="">Product Image</label>
          <v-file-input
          v-model="product.product_image"
            accept="image/png, image/jpeg, image/bmp"
            dense
            outlined
            placeholder="Upload A Product Image"
            prepend-icon=""
            @change="onImageChange"
          ></v-file-input
        ></v-col>
      </v-row>

      
    </v-form>

    <v-card-actions class="mt-n3">
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1"   @click="onClickCreate"> Create </v-btn>
      <slot name="closeBtn"></slot>
    </v-card-actions>
  </div>
</template>

<script>
import { rules } from "@/data/rules.js";
export default {
  name: "CreateProduct",

  data() {
    return {
       loading: false,
        product: {
          product_name: '',
          product_price: '',
          product_image: '',
          product_description: '',
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
    }
  },

  watch: {},
  
  methods: {
  
    
    // Form submission
    onClickCreate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        var formData = new FormData();
   
        formData.append('product_name',  this.product.product_name);
        formData.append('product_price',  this.product.product_price);
        formData.append('product_image',  this.product.product_image);
        formData.append('product_description',  this.product.product_description);
        formData.append('quantity',  this.product.quantity);
        let data = {
          formData: formData
        }

        console.log(data)
        this.$emit('onCreate', data)
        this.loadingHandle(true)
        
      }
    },


    resetValidation() {
      this.$refs.form.resetValidation();
    },
     
    emptyForm(){
       this.product.product_name =  
        this.product.product_price =  
        this.product.product_image =
        this.product.product_description =
        this.product.quantity = '';
    },

    loadingHandle(value) {
      this.loading = value
    },

    onImageChange(e) {
      if(e == undefined){
        this.product.product_image = '';
        return;
      }
      this.product.product_image = e;
    }
  },
  
};
</script>