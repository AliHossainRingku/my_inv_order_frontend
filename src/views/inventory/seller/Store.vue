<template>
<div>
    <div class="pa-5 d-flex justify-space-between">
      <div>
        <div class="d-flex">
          <v-icon class="headline-1">mdi-store</v-icon>
          <h3 class="text-gray">{{ seller.name }}</h3>
        </div>
        
      </div>
      <v-btn 
        text 
        color="#4CAF"
        outlined
        @click="createDialog = true"
      >
        <v-icon>mdi-plus</v-icon>
        Create
      </v-btn>
    </div>

    <!-- table -->
    <div class="pa-5">
      <Table
        :stores="stores"
        @onDeleteItem="onDeleteItem"
        @onEdit="onEdit"
      />
    </div>
    <!-- table -->
    
  <!-- edit dialog -->
    <v-dialog 
      v-model="editDialog"
      width="500"
    >
      <v-card>
        <v-card-title 
          class="headline ml-n3" 
          style="background: #f2f2f2"
        >
          Edit Store
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
    <!-- edit dialog -->


    <!-- create dialog -->
    <v-dialog 
      v-model="createDialog" 
      width="500"
    >
      <v-card>
        <v-card-title 
          class="headline ml-n3" 
          style="background: #f2f2f2"
        >
          Create Store
        </v-card-title>

        <CreateForm 
          ref="createForm"
          @onCreate="onCreate"
        >
          <template v-slot:closeBtn>
            <v-btn 
              color="gray darken-1" 
              text 
              @click="closeCreateDialog"
            >
              Close
            </v-btn>
          </template>
        </CreateForm>
      </v-card>
    </v-dialog>
    <!-- create dialog -->

     <!-- Delete Dialog -->
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
            <v-card-text >If delete, all related data will be eraged.</v-card-text>
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
import EditForm from "@/components/molecule/store/Edit";
import CreateForm from "@/components/molecule/store/Create";
import Table from '@/components/molecule/store/Table'
  export default {
    name: 'SingleSeller',
    components:{
      CreateForm,
      Table,
      EditForm
    },
    props:{

    },
    data(){
      return{
        deleteId: '',
        deleteDialog:false,
        createDialog: false,
        snackbar: false,
        text: '',
        editItem: '',
        editDialog: false,
        snackbarColor:"",
        snackbarIcon:"",
        snackbarButtonColor:"",
      }
    },
    computed:{
      sellerId(){
        return this.$route.params.id;
      },
      seller() {
        return this.$store.state.seller.seller;
      },
      stores() {
        return this.$store.state.store.stores;
      },
      
    },
    watch:{

    },
    methods: {
      ...mapActions([
        'singleSeller',
        'createStore',
        'allStore',
        'deleteStore',
        'updateStore'
      ]),
      closeCreateDialog() {
        this.createDialog = false;
        this.$refs.createForm.resetValidation();
        this.$refs.createForm.emptyForm();
      },
      closeEditDialog() {
        this.editDialog = false;
        this.$refs.createForm.emptyForm();
      },

      async onCreate(data) {
        let res = await this.createStore(data);
        if (res.success) {
          this.snackBarConfig(true);
          this.text = res.message;
          this.closeCreateDialog();
          this.$refs.createForm.loadingHandle(false);
        } else {
          this.snackBarConfig(false);
          this.text = res.message;
          this.$refs.createForm.loadingHandle(false);
        }
      },
       async onUpdate(data) {
        let res = await this.updateStore(data);
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
          storeId: this.deleteId,
          sellerId: this.sellerId,
          _method: 'DELETE'
        }

        let res = await this.deleteStore(data);
        if(res.success){
          this.snackBarConfig(true);
          this.text = res.message;
        }else{
          this.snackBarConfig(false);
          this.text = res.message;
        }
        this.deleteId = "";
      },
      onEdit(item){
        this.editItem = Object.assign({}, item) ;
        this.editDialog = true;
      },
      onDeleteItem(id){
        this.deleteId = id ;
        this.deleteDialog = true;
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
      this.singleSeller(this.sellerId);
      this.allStore(this.sellerId);
    }
  }
</script>

<style>
  
</style>