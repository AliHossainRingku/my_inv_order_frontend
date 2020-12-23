<template>
  <div>
    <div class="pa-5 d-flex justify-space-between">
      <h3>Permissions</h3>
      <v-btn 
        text outlined color="#4CAF" 
        @click="dialog = true"
      >
        <v-icon>mdi-plus</v-icon>
        Create
      </v-btn>
    </div>

    <div class="pa-5">
      <Table 
        @onEdit="onEdit"
        :permissions="permissions" 
        :isFetchingPermission='isFetchingPermission'
        @onDeleteItem="onDeleteItem" 
      />
    </div>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title 
          class="headline ml-n3" 
          style="background: #f2f2f2"
        >
          Create Permission
        </v-card-title>

        <CreateForm
          ref="createForm"
          @onCreate="storePermission"
        >
          <template v-slot:closeBtn>
            <v-btn 
              color="gray darken-1" 
              outlined text
              @click="closeDialog"
            >
              Close
            </v-btn>
          </template>
        </CreateForm>
      </v-card>
    </v-dialog>

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
          Edit permissions
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
import CreateForm from "@/components/molecule/permission/Create";
import Table from "@/components/molecule/permission/Table";
import EditForm from "@/components/molecule/permission/Edit";
export default {
  name: "CategoryPage",
  components: {
    CreateForm,
    Table,
    EditForm
  },
  props: {},
  data() {
    return {
      editItem: '',
      deleteId: '',
      deleteDialog:false,
      dialog: false,
      editDialog:false,
      snackbar: false,
      text: "",
      snackbarColor:"",
      snackbarIcon:"",
      snackbarButtonColor:"",
    };
  },
  
  computed: {
    isFetchingPermission() {
      return this.$store.state.permission.isFetchingPermission;
    },
    permissions() {
      return this.$store.state.permission.permissions;
    }
  },

  watch: {},
  methods: {
    ...mapActions([
      "createPermission", 
      "allPermission", 
      "updatePermission", 
      "deletePermission"
      ]),
    closeDialog() {
      this.dialog = false;
      this.$refs.createForm.resetValidation();
      this.$refs.createForm.emptyForm();
    },

    async storePermission(data) {
      let res = await this.createPermission(data);
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
      let res = await this.updatePermission(data);
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
      let res = await this.deletePermission(data);
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
  },
  onDeleteItem(id){
    this.deleteId = id ;
    this.deleteDialog = true;
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

  mounted() {
    this.allPermission();
  },
};
</script>

<style>
</style>