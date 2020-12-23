<template>
  <div>
    <div class="pa-5 d-flex justify-space-between">
      <h3>Sellers</h3>
      <v-btn 
        text 
        color="#4CAF" 
        @click="dialog = true"
      >
        <v-icon>mdi-plus</v-icon>
        Create
      </v-btn>
    </div>

    <div class="pa-5">
      <Table
        :sellers="sellers"
        @onDeleteItem="onDeleteItem"
        @onEdit="onEdit"
      />
    </div>

    <!-- create dialog -->
    <v-dialog 
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title 
          class="headline ml-n3" 
          style="background: #f2f2f2"
        >
          Add Seller
        </v-card-title>

        <CreateForm
          ref="createForm"
          @onCreate="storeSeller"
        >
          <template v-slot:closeBtn>
            <v-btn 
              color="gray darken-1" 
              text
              @click="closeCrateDialog"
            >
              Close
            </v-btn>
          </template>
        </CreateForm>
      </v-card>
    </v-dialog>
    <!-- create dialog -->


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
          Edit Seller
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
  import Table from "@/components/molecule/seller/Table";
  import CreateForm from "@/components/molecule/seller/Create";
  import EditForm from "@/components/molecule/seller/Edit";
  export default {
    name: 'SellerPage',
    components:{
      Table,
      CreateForm,
      EditForm
    },
    props:{

    },
    data(){
      return{
        editItem: '',
        editDialog: false,
        deleteDialog: false,
        dialog: false,
        snackbar: false,
        deleteId:'',
        text: '',
        snackbarColor:"",
        snackbarIcon:"",
        snackbarButtonColor:"",
      }
    },
    computed:{
      sellers() {
        return this.$store.state.seller.sellers;
      },
    },
    watch:{
      $route() {
        this.allSeller();
      }
    },
    methods:{
      ...mapActions([
        'allSeller',
        'createSeller',
        'updateSeller',
        'deleteSeller'
      ]),
      async storeSeller(data){
        let res = await this.createSeller(data);
        if (res.success) {
          this.snackBarConfig(true);
          this.text = res.message;
          this.closeCrateDialog();
          this.$refs.createForm.loadingHandle(false);
        } else {
          this.snackBarConfig(false);
          this.text = res.message;
          this.$refs.createForm.loadingHandle(false);
        }
      },
      async onUpdate(data) {
        let res = await this.updateSeller(data);
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
          id: this.deleteId,
          _method: "delete",
        };
     
        let res = await this.deleteSeller(data);
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
      closeEditDialog() {
        this.editDialog = false;
        this.$refs.editForm.emptyForm();
      },
      closeCrateDialog() {
        this.dialog = false;
        this.$refs.createForm.resetValidation();
        this.$refs.createForm.emptyForm();
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
    mounted() {
      this.allSeller()
    }
  }
</script>