<template>
  <!--  root section-->
  <div class="row px-5 mt-3">
    <div class="col-md-5 col-lg-5 col-sm-12">
      <!--  CREATE FORM  -->
      <v-form v-if="!isEditCompOpen" v-model="valid" ref="form">
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
        <v-row class="mt-n7">
          <v-col cols="12">
            <label>Customer <span class="red--text">*</span></label>
            <v-autocomplete
              v-model="customerId"
              :items="this.customers"
              item-text="name"
              :rules="rules.customerRules"
              dense
              item-value="id"
              outlined
              placeholder="Select Customer"
              required
            >
            </v-autocomplete>
          </v-col>
        </v-row>

        <!--        store-->
        <v-row class="mt-n9">
          <v-col cols="12">
            <label>Store <span class="red--text">*</span></label>
            <v-autocomplete
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
            </v-autocomplete>
          </v-col>
        </v-row>

        <h4 style="color: #617061" class="mt-n6">Cost Management</h4>
        <div style="border-bottom: 1px solid #5d665d" class="my-2"></div>

        <!--        vat-->
        <v-row class="mt-n2">
          <v-col cols="12">
            <label>Vat (%) </label>
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

        <v-row class="mt-n8">
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
      <!--  END CREATE FORM  -->

      <UpdateCartItem
        v-if="isEditCompOpen"
        :item="updateItem"
        :todos="this.todos"
        @onUpdateCart="updateCart"
        @onCancelUpdateForm="cancelUpdate"
      ></UpdateCartItem>

      <!--  FOOTER  -->
      <v-card-actions class="mt-n3" v-if="!isEditCompOpen">
        <h5 class="red--text">* Marked fields are required.</h5>

        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="addToCart">
          Add To List
        </v-btn>
      </v-card-actions>
      <!--  END FOOTER  -->
    </div>

    <!--    cart section -->
    <div class="col-md-7 col-lg-7 col-sm-12 orderListRoot">
      <Cart
        :cartList="cartInfos"
        :orderListOption="orderListOption"
        @updateCart="updateCartItem"
        @deleteCartList="onDeleteCartList"
        @placeOrder="onPlaceOrder"
      ></Cart>
    </div>
    <!-- end cart section -->
  </div>
</template>

<style lang="css">
.orderListRoot {
  border-left: 2px solid lightgreen;
}
</style>

<script>
import { rules } from "@/data/rules.js";
import { orderListOption } from "@/data/order";
import { mapActions } from "vuex";
import Cart from "@/components/molecule/order/Cart";
import UpdateCartItem from "@/components/molecule/order/UpdateCartItem";

export default {
  name: "CreateProduct",

  components: {
    Cart,
    UpdateCartItem,
  },
  props: {
    sId: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      customerId: "",
      customerName: "",
      productId: "",
      productName: "",
      storeId: "",
      storeName: "",
      status: null,
      quantity: 1,
      vat: 1,
      price: 100,
      items: [],
      orderListOption: orderListOption,
      item: {},

      /* updating data */
      todos: {},
      updateItem: {},

      /* conditional values  */
      valid: false,
      loading: false,
      search: null,
      isEditCompOpen: false,
    };
  },
  computed: {
    rules() {
      return rules;
    },
    seller() {
      return this.$route.params.id;
    },
    products() {
      return this.$store.state.product.products;
    },
    stores() {
      return this.$store.state.store.stores;
    },
    cartInfos() {
      return this.$store.state.order.cartInfos;
    },
    customers() {
      return this.$store.state.customer.customers;
    },
  },

  watch: {
    // search function
    search(val) {
      val && val !== this.productId && this.productQuerySelections(val);
    },

    // Watch product changes
    productId(value) {
      let product;
      this.products.forEach((obj) => {
        if (obj.id == value) product = obj;
      });
      this.productName = product.name;
      this.price = product.price;
    },

    // watch customer changes
    customerId(value) {
      let customer;
      this.customers.forEach((obj) => {
        if (obj.id == value) customer = obj;
      });
      this.customerName = customer.name;
    },

    // watch store id changes
    storeId(value) {
      let store;
      this.stores.forEach((obj) => {
        if (obj.id == value) store = obj;
      });
      this.storeName = store.name;
    },
  },

  methods: {
    ...mapActions([
      "allSeller",
      "allProducts",
      "allStore",
      "storeOrder",
      "addToCartStore",
      "getFromCartStore",
      "deleteCacheData",
      "getAllCustomer",
    ]),

    addToCart() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        // console.log("validate");
        let localOrder = {
          sellerId: this.seller,
          customers: [
            {
              id: this.customerId,
              name: this.customerName,
              items: [
                {
                  product: {
                    id: this.productId,
                    name: this.productName,
                  },
                  store: {
                    id: this.storeId,
                    name: this.storeName,
                  },
                  status: null,
                  quantity: this.quantity,
                  vat: this.vat,
                  price: this.price,
                },
              ],
            },
          ],
        };
        // localStorage.removeItem('myCart')
        this.addToCartStore(localOrder);

        this.customerId = "";
        this.storeId = "";
        this.productId = "";
        this.price = 0;
        this.quantity = 0;
        this.vat = 0;
        this.$refs.form.resetValidation();
      }
    },

    // function for making an order
    onPlaceOrder() {
      
      let cartList = this.cartInfos;

      cartList.forEach((seller) => {
        if (seller.sellerId == this.seller) {
          seller.customers.forEach((customer) => {
            let itemL = [];
            let formData = new FormData();
            formData.append("customer_id", customer.id);
            formData.append("seller_id", seller.sellerId);

            customer.items.forEach((item) => {
              let itemObject = {
                store_id: item.store.id,
                product_id: item.product.id,
                price: item.price,
                vat: item.vat,
                quantity: item.quantity,
              };
              itemL.push(itemObject);
            }); //end of items array

            formData.append("items", JSON.stringify(itemL));
            let data = {
              seller_id: this.seller,
              formData: formData,
            };
            this.$emit("onCreate", data);
          }); //end of customer array
        }
      }); // end of seller array
    },

    // delete cart item
    onDeleteCartList(cartInfo) {
      console.log("delete");
      this.deleteCacheData(cartInfo);
    },

    //update Cart Item
    updateCartItem(todos, item) {
      this.todos = todos;
      this.updateItem = item;
      this.isEditCompOpen = true;
    },

    updateCart() {
      this.isEditCompOpen = false;
    },

    /* Closing Update cart Product section. */
    cancelUpdate() {
      this.isEditCompOpen = false;
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },

    productQuerySelections: (v) => {
      this.loading = true;

      // Simulated ajax query
      setTimeout(() => {
        this.items = this.products.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    loadingHandle(value) {
      this.loading = value
    },
    onThumbnailChange(e) {
      if(e == undefined){
        this.product.thumbnail = '';
        return;
      }
      this.product.thumbnail = e;
    },
    onImageChange(e) {
      if(e == undefined){
        this.product.mages = '';
        return;
      }
      this.product.mages = e;
    }
  },

  mounted() {
    this.allProducts(this.seller);
    this.allStore(this.seller);
    this.getFromCartStore(this.seller);
    this.getAllCustomer();
  },
};
</script>