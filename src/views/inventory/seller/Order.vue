<template>
  <div>
    <div class="pa-5 d-flex justify-space-between">

      <h3>Orders (Seller: {{ sellerInfo.name }})</h3>  <!--      /* title of the page.*/-->
      <v-btn
          text
          color="#4CAF"
          @click="dialog = true"
      >
        <v-icon>mdi-plus</v-icon>
        Create
      </v-btn>
    </div>
    <!-- end table component -->

    <!-- create dialog -->
    <v-dialog
        v-model="dialog"
        width="1050"
    >
      <v-card>
        <v-card-title class="headline ml-n3" style="background: #f2f2f2">
          Create Order
        </v-card-title>

        <CreateForm 
        ref="createForm"
        :orders="orders"
        :categories="categories"
        :brands="brands"
        :stores="stores"
        @changeCategory="changeCategoryGetBrand"
        @onCreate="storeProduct"
        >
          <template v-slot:closeBtn>
            <v-btn color="gray darken-1" text @click="closeDialog">
              Close
            </v-btn>
          </template>
        </CreateForm>
      </v-card>
    </v-dialog>
         <!-- edit dialog -->
    <v-dialog 
      v-model="editDialog"
      width="700"
    >
      <v-card>
        <v-card-title
            class="headline ml-n3"
            style="background: #f2f2f2"
        >
          Edit Product
        </v-card-title>

        <EditForm
          ref="editForm"
          :item="editItem"
          :categories="categories"
          :brands="brands"
          :stores="stores"
          @changeCategory="changeCategoryGetBrand"
          @onUpdate="onUpdate"
        >
          <template v-slot:closeBtn>
            <v-btn 
              color="gray darken-1" 
              text
              @click="closeEditDialog"
            >
              Close
            </v-btn>
          </template>
        </EditForm>
      </v-card>
    </v-dialog>
    <!-- end edit dialog -->

 
    <v-snackbar 
      v-model="snackbar" 
      :color='snackbarColor'
      right
      top
      :multi-line="true"
    >
    <v-icon>{{snackbarIcon}}</v-icon>
      {{ text }}

      <template 
        v-slot:action="{ attrs }"
      >
 
      <v-icon 
      :color="snackbarButtonColor" 
      text v-bind="attrs" 
      @click="snackbar = false"
      >
        mdi-close
      </v-icon>
      </template>
    </v-snackbar>

  </div>
</template>

<script>
import { mapActions } from "vuex";
import CreateForm from "@/components/molecule/order/Create";
import EditForm from "@/components/molecule/order/Edit";
//import Table from "@/components/molecule/order/Table";

export default {
  name: 'OrderPage',
  components: {
    CreateForm,
    //Table,
    EditForm
  },
  props: {},
  data() {
    return {
      dialog: false,
      editItem: '',
      snackbar: false,
      text: "",
      editDialog:false
    };
  },
  computed: {
    sellerId() {
     return this.$route.params.id;
    },
    allOrder(){
      console.log(this.$store.state.order.orders)
      return this.$store.state.order.orders;
    },
    brands() {
      return this.$store.state.brand.categoryDebendentBrands;
    },
    stores() {
      return this.$store.state.store.stores;
    },
    products() {
      return this.$store.state.product.products;
    },
     sellers() {
      return this.$store.state.seller.sellers;
    },
    sellerInfo() {
      return this.$store.state.seller.seller;
    },
  },

  watch:{},

  methods:{

    // mapping actions of order.js
    ...mapActions([
      "singleSeller",
      'getAllOrder',
      'storeOrder',
      'updateStatus',
      'allProducts',
      'allStore',
      'addToCartStore',
      'getFromCartStore'
    ]),

    //orders are being stored here.
    async addOrder(data) {
       let res = await this.storeOrder(data);
         this.dialog=false;
       if (res.success) {
         this.snackBarConfig(true);
         this.text      = res.message;
         this.closeCreateDialog();
         this.$refs.createForm.loadingHandle(false);
         } else {
         this.snackBarConfig(false);
         this.text      = res.message;
         this.$refs.createForm.loadingHandle(false);
       }
    },

     async changeCategoryGetBrand(data) {
        await this.categoryDependentBrand(data);
     },

    async storeProduct(data) {
      let res = await this.createProduct(data);
      if (res.success) {
        this.snackBarConfig(true);
        this.text     = res.message;
        this.closeEditDialog();
        // console.log("fdfdfdfdf");
        this.$refs.editForm.loadingHandle(false);
      } else {
        this.snackbar = true;
        this.text = res.message;
        this.$refs.editForm.loadingHandle(false);
      }
      
    },
    snackBarConfig(config){
      this.snackbar = true;
      if (config) {
        this.snackbarIcon = "mdi-check-circle";
        this.snackbarColor = "teal darken-2";
        this.snackbarButtonColor="red";
      }else{
        this.snackbarIcon = "mdi-cancel"
        this.snackbarColor = "red darken-4"
        this.snackbarButtonColor="warning";
      }
    },

    /*  edit action */
    onEditClick(order){
      console.log(order)
      this.editItem   = order
      this.editDialog = true;
    },

    /*  create dialog closing action */
    closeDialog() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.$refs.form.emptyForm();
    },

    /*  edit dialog closing action */
    closeEditDialog() {
      this.editDialog = false;
      this.$refs.form.reset()
    },


    closeCrateDialog() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.$refs.form.emptyForm();
    },

  },

  mounted() {
    this.getAllOrder(this.seller);
    this.allStore(this.seller);
    this.allProducts(this.seller);
    this.singleSeller(this.seller);

  }
}
</script>