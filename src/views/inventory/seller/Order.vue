<template>
  <div>
    <div class="pa-5 d-flex justify-space-between">
     <h3>Orders</h3>
      <v-btn 
      text 
      outlined 
      color="#4CAF" 
      @click="dialog = true">
        <v-icon>mdi-plus</v-icon>
        Create
      </v-btn>
    </div>

    <div class="pa-5 mt-n10">
      <Table
        :orders="orders" 
        @onDeleteItem="onDeleteItem"
        @onEdit="onEdit"
      />
    </div>
    
    <!-- Create dialog starts -->
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-card-title class="headline ml-n3" style="background: #f2f2f2">
          Create Order
        </v-card-title>

        <CreateForm 
        ref="createForm"
        @onCreate="storeOrder"
        >
          <template v-slot:closeBtn>
            <v-btn color="gray darken-1" text @click="closeDialog">
              Close
            </v-btn>
          </template>
        </CreateForm>
      </v-card>
    </v-dialog>
   <!-- Create dialog ends-->
   
   <!-- edit dialog starts -->
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
    <!-- edit dialog ends-->

    <!-- Delete Dialog starts-->
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="deleteDialog"
          persistent
          max-width="350"
        >
      
          <v-card>
            <v-card-title class="headline red--text ">
              Are You Sure To Delete?
            </v-card-title>
            <v-card-text >If delete, all related data will be erased.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                dark
                outlined
                small
                @click="deleteDialog = false"
              >
                No
              <v-icon small>mdi-close</v-icon>

              </v-btn>
              <v-btn
                color="red darken-1"
                dark
                outlined
                small
                @click="onDelete"
              >
                Yes Delete
              <v-icon small>mdi-check</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- Delete dialog ends -->

    <!-- snackbar for shwoing message of notification starts -->
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
     <!-- snackbar for shwoing message of notification ends-->
    
  </div>
</template>

<script>
import CreateForm from "@/components/molecule/order/Create";
//import EditForm from "@/components/molecule/order/Edit";
import Table from "@/components/molecule/order/Table";
import { mapActions } from 'vuex';

export default {
  name: 'OrderPage',
  components: {
    Table,
    CreateForm,
    //EditForm
  },
  props: {},
  data() {
    return {
      editItem: '',
      deleteId: '',
      deleteDialog:false,
      text: "",
      snackbar: false,
      dialog: false,
      editDialog:false,
      stockDialog:false,
      snackbarColor:"",
      snackbarIcon:"",
      snackbarButtonColor:"",
        items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    };
  },
  computed: {
    orders() {
      return this.$store.state.order.orders;
    },
  },

  watch:{},

  methods:{
    ...mapActions([
      "createOrder",
      "allOrders",
    ]),
    closeDialog() {
      this.dialog = false;
      this.$refs.createForm.resetValidation();
      this.$refs.createForm.emptyForm();
    },

    async storeOrder(data) {
      let res = await this.createOrder(data);
      if (res.success) {
        this.snackBarConfig(true);
        this.text = res.message;
        this.closeDialog();
        this.$refs.createForm.loadingHandle(false);
      } else {
        this.snackBarConfig(false);
        this.text = res.message;
        this.$refs.createForm.loadingHandle(false);
      }
    },
    

    async onUpdate(data) {
      let res = await this.updateProduct(data);
      if (res.success) {
        this.snackBarConfig(true);
        this.text = res.message;
        this.closeEditDialog();
        this.$refs.editForm.loadingHandle(false);
      } else {
        this.snackBarConfig(false);
        this.text = res.message;
        this.$refs.editForm.loadingHandle(false);
      }
    },
    async onDelete() {
      this.deleteDialog = false;
      let data = {
        sellerId:this.sellerId,
        id: this.deleteId,
        _method: "delete",
      };
      let res = await this.deleteProduct(data);
      if (res.success) {
        this.snackBarConfig(true);
        this.text = res.message;
      } else {
        this.snackBarConfig(false);
        this.text = res.message;
      }
      this.deleteId = "";
    },
    onEdit(item){
        this.editItem = Object.assign({}, item) ;
        this.editDialog = true;
        let data = {
          sellerId:item.sellers[0].id,
          categoryId:item.category.id
        };
        this.editItemCatName="";
        this.editItemCatName = this.categoriesWithParent.filter(i => i.id == item.category.id)[0]?this.categoriesWithParent.filter(i => i.id == item.category.id)[0].name: '';
        this.editItemCatName = this.categoriesWithParent.filter(i => i.id == item.category.id)[0]?this.categoriesWithParent.filter(i => i.id == item.category.id)[0].name: '';
        this.categoryDependentBrand(data);
      },


      onDeleteItem(id){
        this.deleteId = id ;
        this.deleteDialog = true;
      },
      closeStockDialog() {
        this.stockDialog = false;
        this.$refs.stockForm.resetValidation();
        this.$refs.stockForm.emptyForm();
      },
      closeEditDialog() {
        this.editDialog = false;
        this.$refs.editForm.emptyForm();
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
  },
  mounted(){
    this.allOrders();
  }
 }
</script>