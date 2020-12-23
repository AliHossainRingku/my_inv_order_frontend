<template>
  <div class="px-3 mt-3">
    <h3 class="my-1">Update Cart List</h3>
    <v-form v-model="valid" ref="form">

      <!--        seller products  Column-->
      <v-row class="mt-n4">
        <v-col cols="12">
          <label>Product <span class="red--text">*</span></label>
          <v-autocomplete
              v-model="productId"
              :loading="loading"
              :items="products"
              item-text="name"
              item-value="id"
              :search-input.sync="search"
              :rules="rules.productRules"
              outlined
              flat
              dense
              label="Product Name"
              solo
          ></v-autocomplete>
        </v-col>
      </v-row>

      <!--      customer-->
      <!-- <v-row class="mt-n7">
        <v-col cols="12">
          <label>Customer <span class="red--text">*</span></label>
          <v-select
              v-model="customerId"
              :items="customers"
              item-text="name"
              :rules="rules.customerRules"
              dense
              item-value="id"
              outlined
              placeholder="Select Customer"
              required
              readonly
          >
          </v-select>
        </v-col>
      </v-row> -->

      <!--        store-->
      <v-row class="mt-n9">
        <v-col cols="12">
          <label >Store <span class="red--text">*</span></label>
          <v-select
              v-model="storeId"
              :items="stores"
              :rules="rules.storeRules"
              dense
              item-text="name"
              item-value="id"
              outlined
              placeholder="Select Stores"
              required
          >
          </v-select>
        </v-col>
      </v-row>

      <h4 style="color: #617061" class="mt-n7">Cost Management</h4>
      <div style="border-bottom: 1px solid #5d665d" class="my-2"></div>

      <!--        vat-->
      <v-row class="mt-n2">
        <v-col cols="12">
          <label>Vat (%) <span class="red--text">*</span></label>
          <v-text-field
              v-model="vat"
              :rules="rules.vatRules"
              dense
              outlined
              placeholder="vat"
              required
          ></v-text-field
          ></v-col>
      </v-row>

      <v-row class="mt-n2">

        <!--        quantity-->
        <v-col cols="6">
          <label>Quantity <span class="red--text">*</span></label>
          <v-text-field
              v-model="quantity"
              dense
              outlined
              placeholder="Quantity"
              :rules="rules.quantityRules"
              required
          ></v-text-field>
        </v-col>

        <!--        price-->
        <v-col cols="6">
          <label>Price <span class="red--text">*</span></label>
          <v-text-field
              v-model="price"
              :rules="rules.priceRules"
              dense
              value="this.get"
              outlined
              placeholder="Price"
              required
          ></v-text-field>
        </v-col>
      </v-row>

    </v-form>
    <!--  FOOTER  -->
    <v-card-actions class="mt-n3">
      <h5 class="red--text">* Marked fields are required.</h5>

      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="$emit('onCancelUpdateForm')"> Cancel </v-btn>
      <v-btn color="green darken-1" text @click="onClickUpdate"> Update </v-btn>
    </v-card-actions>
    <!--  END FOOTER  -->
  </div>
</template>

<script>
import { rules } from "@/data/rules.js";
import {mapActions} from "vuex";
export default {
  name: "EditCartStatus",
  components: {},
  props: {
    item: {
      type      : Object,
      required  : true
    },
    todos:  {
      type      : Object,
      required  : true
    }
  },
  data() {
    return {
      customerId      : this.todos.customerId,
      customerName    : this.todos.customerName,
      productId       : this.item.product.id,
      productName     : this.item.product.name,
      storeId         : this.item.store.id,
      storeName       : this.item.store.name,
      status          : this.item.status,
      quantity        : this.item.quantity,
      vat             : this.item.vat,
      price           : this.item.price,
      items           : [],
      customers       : [
        {
          id    : 1,
          name  : "Joy",
          age   : 20
        },
        {
          id    : 2,
          name  : "Joy2",
          age   : 20
        },
      ],

      /* conditional values  */
      valid           : false,
      loading         : false,
      search          : null,
      isEditCompOpen  : false
    };
  },

  computed: {
    rules() {
      return rules;
    },
    seller(){
      return this.$route.params.id;
    },
    products() {
      return this.$store.state.product.products;
    },
    stores(){
      return this.$store.state.store.stores;
    },
  },

  watch: {

    search (val) {
      val && val !== this.productId && this.querySelections(val)
    },

    productId(value){
      let product;
      this.products.forEach((obj)  =>  {
        if (obj.id == value) product  = obj ;
      });
      this.productName  = product.name;
      this.price        = product.price
    },

    customerId(value) {
      let customer;
      this.customers.forEach((obj)  =>  {
        if (obj.id == value) customer = obj;
      });
      this.customerName  = customer.name;
    },

    storeId(value) {
      let store;
      this.stores.forEach((obj)  =>  {
        if (obj.id == value) store = obj;
      });
      this.storeName  = store.name;
    },

  },

  methods: {
    ...mapActions([
        'updateCartStore'
    ]),

    /* action of clicking update button */
    onClickUpdate() {
      this.$refs.form.validate();

      if(this.$refs.form.validate()){

        let localOrder = {
          sellerId    : this.seller,
          itemIndex   : this.todos.cartIndex,
          customers   : [
            {
              id    : this.customerId,
              name  : this.customerName,
              items : [{
                product   : {
                  id    : this.productId,
                  name  : this.productName
                },
                store     : {
                  id    : this.storeId,
                  name  : this.storeName
                },
                status    : null,
                quantity  : this.quantity,
                vat       : this.vat,
                price     : this.price
              }]
            }
          ]
        }
        this.updateCartStore(localOrder);
        this.$emit('onUpdateCart')
        this.loadingHandle(true);
      }
    },

    /* action for empty form */
    emptyForm(){
      this.product.status = null;
    },

    loadingHandle(value) {
      this.loading = value
    },
  },

};
</script>