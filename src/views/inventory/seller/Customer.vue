<template>
  <div>
    <div class="pa-5 d-flex justify-space-between">
      <h3>Customers</h3>
      <v-btn text outlined color="#4CAF" @click="dialog = true">
        <v-icon>mdi-plus</v-icon>
        Create
      </v-btn>
    </div>

    <!-- customer table -->
       <div class="pa-5">
      <Table 
        :customers="allCustomers"
       />
    </div>
    <!-- end customer table -->

    <!--    create Dialog-->
    <v-dialog v-model="dialog" width="450">
      <v-card>
        <v-card-title class="headline ml-n3" style="background: #f2f2f2">
          Create Customer
        </v-card-title>

        <CreateForm
        ref="createForm"
        @onCreate="createCustomer"
        >
          <template v-slot:closeBtn>
            <v-btn color="gray darken-1" text @click="dialog=!dialog">
              Close
            </v-btn>
          </template>
        </CreateForm>
      </v-card>
    </v-dialog>
    <!--    end create Dialog-->
    
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
          Edit Customer
        </v-card-title>

        <EditForm
          ref="editForm"
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
    <!-- edit dialog -->

    <!-- snackbar for shwoing message of notification -->

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
    <!-- end snackbar for shwoing message of notification -->

  </div>
</template>

<script>
import CreateForm from "@/components/molecule/customer/Create";
import EditForm from "@/components/molecule/customer/Edit";
import Table from "@/components/molecule/customer/Table";
import {mapActions} from "vuex";


export default {
  name: "Customer Page",
  components: {
    CreateForm,
    Table,
    EditForm
  },
  props: {},
  data() {
    return {
      dialog          : false,
      editItem        : '',
      editItemCatName : '',
      snackbar        : false,
      text            : "",
      editDialog      : false,
      categoryBrands  : {},
      snackbarColor:"",
      snackbarIcon:"",
      snackbarButtonColor:"",
    };
  },
  computed: {
    allCustomers(){
      return this.$store.state.customer.customers;
    }
  },
  watch: {},
  methods: {
    ...mapActions([
        'getAllCustomer',
        'addCustomer'
    ]),

    // creating customer
    async createCustomer(data){
      let res = await this.addCustomer(data);
      if (res.success) {
        this.snackBarConfig(true);
        this.text     = res.message;
        this.closeCreateDialog();
        this.$refs.createForm.loadingHandle(false);
        // this.$refs.createForm.emptyForm();
        this.closeCreateDialog() ;

      } else {
        this.snackBarConfig(false);
        this.text     = res.message;
        this.$refs.createForm.loadingHandle(false);
        // this.$refs.createForm.loadingHandle(false);
      }
    },

    //closing create dialog
    closeCreateDialog() {
      this.dialog = false;
      this.$refs.createForm.resetValidation();
      // this.$refs.createForm.reset();
      this.$refs.createForm.emptyForm();

    },

    /* closing edit dialog action */
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

   mounted() {
    this.getAllCustomer()
  },
};
</script>

<style>
</style>