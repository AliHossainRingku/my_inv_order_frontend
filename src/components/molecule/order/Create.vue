<template>
  <div class="px-3 mt-3">
    <v-form v-model="valid" ref="form">

      <v-row class="mt-n4">
        <v-col cols="12">
          <label for="">Customer ID <span class="red--text">*</span></label>
          <v-text-field
            v-model="order.customer_id"
            :rules="rules.quantityRules"
            dense
            outlined
            placeholder="Customer ID"
            required
          ></v-text-field
        ></v-col>
      </v-row>

    
      <!-- ADD Shopping CART started-->
        <!--Item 1 started-->
        <v-row class="mt-n9">
          <v-col cols="12">
          <label for="">Number of Cart Items <span class="red--text">*</span></label>
          <v-text-field
            v-model="order.shoppingCart.cart_items"
            :rules="rules.quantityRules"
            dense
            outlined
            placeholder="Number of Cart Items"
            required
          ></v-text-field
        ></v-col>
        </v-row>

        <v-row class="mt-n9">
          <v-col cols="4">
            <label for="">Product ID <span class="red--text">*</span></label>
            <v-text-field
              v-model="order.shoppingCart.product_id"
              :rules="rules.quantityRules"
              dense
              outlined
              placeholder="Product ID"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <label for="">Unit Price <span class="red--text">*</span></label>
            <v-text-field
              v-model="order.shoppingCart.unit_price"
              :rules="rules.priceRules"
              dense
              outlined
              placeholder="Unit Price"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <label for="">Quantity <span class="red--text">*</span></label>
            <v-text-field
              v-model="order.shoppingCart.quantity"
              :rules="rules.quantityRules"
              dense
              outlined
              placeholder="Product Name"
              required
            ></v-text-field
          ></v-col>
        </v-row>
        <!--Item 1 ended-->

      
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
  name: "CreateOrder",

  data() {
    return {
       loading: false,
        order: {
          customer_id: '',

          shoppingCart: {
            cart_items: '',
            product_id: '',
            unit_price: '',
            quantity: '',
          },


          total_cost: '',
          total_quantity: '',
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
   
        formData.append('customer_id',  this.order.customer_id);

        formData.append('cart_items',  this.order.shoppingCart.cart_items);
        formData.append('product_id',  this.order.shoppingCart.product_id);
        formData.append('unit_price',  this.order.shoppingCart.unit_price);
        formData.append('quantity',  this.order.shoppingCart.quantity);

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
        this.order.customer_id =  
        this.order.shoppingCart.cart_items =  
        this.order.shoppingCart.product_id = 
        this.order.shoppingCart.unit_price =
        this.order.shoppingCart.quantity = '';
    },

    loadingHandle(value) {
      this.loading = value
    },

  },
  
};
</script>