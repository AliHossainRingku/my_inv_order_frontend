<template>
  <div>
    <div class="pa-5 d-flex justify-space-between">
      <h3>Roles</h3>
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
        :roles="roles"
        :permissions="permissions" 
        @onAssignRole="onAssignRole"
        @onEdit="onEdit"
        @onDeleteItem="onDeleteItem" 
      />
    </div>

    <v-dialog v-model="dialog" width="650">
      <v-card>
        <v-card-title 
          class="headline ml-n3" 
          style="background: #f2f2f2"
        >
          Create Role
        </v-card-title>

        <CreateForm
          ref="createForm"
          @onCreate="storeRole"
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
      width="650"
    >
      <v-card>
        <v-card-title 
          class="headline ml-n3" 
          style="background: #f2f2f2"
        >
          Edit Role
        </v-card-title>

        <EditForm
          ref="editForm"
          :item="editItem"
          :itemPermissions="itemPermissions" 
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
    <!-- Assign Role dialog -->
    <v-dialog 
      v-model="assignRoleDialog"
      width="450"
    >
      <v-card>
        <v-card-title 
          class="headline ml-n3" 
          style="background: #f2f2f2"
        >
          Assign Role
        </v-card-title>

        <AssignRoleForm
          ref="assignRoleForm"
          :item="assignRoleItem"
          @createAssignRole="createAssignRole"
        >
          <template v-slot:closeBtn>
            <v-btn 
              color="gray darken-1" 
              text
              @click="closeAssignRoleDialog"
            >
              Close
            </v-btn>
          </template>
        </AssignRoleForm>
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
import CreateForm from "@/components/molecule/role/Create";
import Table from "@/components/molecule/role/Table";
import EditForm from "@/components/molecule/role/Edit";
import AssignRoleForm from "@/components/molecule/role/AssignRole";
export default {
  name: "RolePage",
  components: {
    CreateForm,
    Table,
    EditForm,
    AssignRoleForm,
  },
  props: {},
  data() {
    return {
      itemPermissions : [],
      editItem: '',
      assignRoleItem: '',
      deleteId: '',
      dialog: false,
      snackbar: false,
      assignRoleDialog:false,
      editDialog:false,
      deleteDialog:false,
      text: "",
      snackbarColor:"",
      snackbarIcon:"",
      snackbarButtonColor:"",
    };
  },
  computed: {
    isFetchingRole() {
      return this.$store.state.role.isFetchingRole;
    },
    roles() {
      return this.$store.state.role.roles;
    },
    permissions() {
      return this.$store.state.permission.permissions;
    }
   
  },
  watch: {},
  methods: {
    ...mapActions([
      "createRole", 
      "allRole", 
      "assignRole", 
      "allPermission", 
      "updateRole", 
      "deleteRole"
    ]),
    closeDialog() {
      this.dialog = false;
      this.$refs.createForm.resetValidation();
      this.$refs.createForm.emptyForm();
    },

    async storeRole(data) {
      let res = await this.createRole(data);
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

    async createAssignRole(data) {
      let res = await this.assignRole(data);
      if (res.success) {
        this.snackBarConfig(true);
        this.text = res.message;
        this.closeAssignRoleDialog();
        this.$refs.assignRoleForm.loadingHandle(false);
      } else {
        this.snackBarConfig(false);
        this.text = res.message;
        this.$refs.assignRoleForm.loadingHandle(false);
      }
    },
    async onUpdate(data) {
      let res = await this.updateRole(data);
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
     
      let res = await this.deleteRole(data);
      if (res.success) {
        this.snackBarConfig(true);
        this.text = res.message;
      } else {
        this.snackBarConfig(false);
        this.text = res.message;
      }
      this.deleteId = "";
    },
    onAssignRole(item){
      this.assignRoleItem = Object.assign({}, item) ;
      this.assignRoleDialog = true;
    },
    onEdit(item){
      this.editItem = Object.assign({}, item) ;
      this.editDialog = true;
      this.itemPermissions = [];
      this.editItem.permissions.forEach((perm,index) => {
        this.itemPermissions[index]= perm.id.toString();  
      });
    },
    onDeleteItem(id){
      this.deleteId = id ;
      this.deleteDialog = true;
    },
    closeEditDialog() {
      this.editDialog = false;
      this.$refs.editForm.emptyForm();
    },
    closeAssignRoleDialog() {
      this.assignRoleDialog = false;
      this.$refs.assignRoleForm.emptyForm();
      this.$refs.assignRoleForm.resetValidation();
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
    this.allRole();
    this.allPermission();
  },
};
</script>

<style>
</style>