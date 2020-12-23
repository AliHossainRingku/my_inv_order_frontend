<template>
  <div>
    <div class="pa-5 d-flex justify-space-between">
      <h3>Sellers</h3>
      <v-btn 
        text 
        color="#4CAF" 
        @click="dialog = !dialog"
      >
        <v-icon>mdi-plus</v-icon>
        Create
      </v-btn>
    </div>

    <div class="pa-5">
      <Table
        :sellers="sellers"
        @onDelete="onDelete"
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


    <v-snackbar 
      v-model="snackbar" 
      :multi-line="true"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn 
          color="green" 
          text 
          v-bind="attrs" 
          @click="snackbar = false"
        >
          Close
        </v-btn>
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
        dialog: false,
        snackbar: false,
        text: '',
      }
    },
    computed:{
      sellers() {
        return this.$store.state.seller.sellers;
      },
    },
    watch:{

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
          this.snackbar = true;
          this.text = res.message;
          this.closeCrateDialog();
          this.$refs.createForm.loadingHandle(false);
        } else {
          this.snackbar = true;
          this.text = res.message;
          this.$refs.createForm.loadingHandle(false);
        }
      },
      async onUpdate(data) {
        let res = await this.updateSeller(data);
        if (res.success) {
          this.snackbar = true;
          this.text = res.message;
          this.closeEditDialog();
          this.$refs.editForm.loadingHandle(false);
        } else {
          this.snackbar = true;
          this.text = res.message;
          this.$refs.editForm.loadingHandle(false);
        }
      },
      async onDelete(id) {
        console.log(id, 'id')
        let data = {
          id: id,
          _method: 'delete'
        };
        let res = await this.deleteSeller(data);
        if(res.success){
          this.snackbar = true;
          this.text = res.message;
        }else{
          this.snackbar = true;
          this.text = res.message;
        }
      },
      onEdit(item){
        // console.log(item, 'item')
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
    },
    mounted() {
      console.log('seller mounted')
      this.allSeller()
    }
  }
</script>