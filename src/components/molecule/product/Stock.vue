<template>
  <div class="px-3 mt-3">
    <v-form v-model="valid" ref="form">
      <v-row class="mt-n2">
        <v-col cols="12">
          <label for="">Select Store  <span class="red--text">*</span></label>
          <v-select
          v-model="product.store_id"
            :items="stores"
            :rules="rules.storeRules"
            item-text="name"
            item-value="id"
            dense
            outlined
            placeholder="Select Store"
            required
          >
          </v-select
        ></v-col>
        <v-col cols="12" class="mt-n6">
          <label for="">Quantity <span class="red--text">*</span></label>
          <v-text-field
            v-model="product.quantity"
            :rules="rules.quantityRules"
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
import { rules } from "@/data/rules.js";
export default {
  name: "StockProductPage",

  components: {
  },

  props: {
    productIdStock: {
      required: true
    },
    stores: {
      required: true
    },
  },

  data() {
    return {
       loading: false,
        product: {
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
   
  },

  watch: {},

  methods: {
    
    
    // Form submission
    onClickCreate() {
      this.$refs.form.validate();
      if(this.$refs.form.validate()){
        var formData = new FormData();
   
        formData.append('store_id',  this.product.store_id);
        formData.append('quantity',  this.product.quantity);
        let data = {
          productId: this.productIdStock,
          formData: formData
        }
        this.$emit('onSaveStock', data);
      }
    },

   

    resetValidation() {
      this.$refs.form.resetValidation();
      this.emptyForm();
    },
     
    emptyForm(){
        console.log('sohag');
       this.product.store_id =  this.product.quantity =  '';
    },

    loadingHandle(value) {
      this.loading = value
    },

  
  },
  
};
</script>