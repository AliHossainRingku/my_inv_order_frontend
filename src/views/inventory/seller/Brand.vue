<template>
  <div>
    <div class="pa-5 d-flex justify-space-between">
      <h3>Brands (Seller: {{ seller.name }})</h3>
      <v-btn text outlined color="#4CAF" @click="dialog = true">
        <v-icon>mdi-plus</v-icon>
        Create
      </v-btn>
    </div>
    <div class="pa-5">
      <Table 
        :brands="brands" 
        @onDeleteItem="onDeleteItem"
        @onEdit="onEdit"
       />
    </div>
    <v-dialog v-model="dialog" width="600">
      <v-card>



        <v-card-title class="headline ml-n3" style="background: #f2f2f2">
          Create Brand
        </v-card-title>

        <CreateForm
          ref="createForm"
          :categories="categories"
          @snackbarEvent="snackbarEvent"
          @onCreate="storeBrand"
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
      width="600"
    >
      <v-card>
        <v-card-title 
          class="headline ml-n3" 
          style="background: #f2f2f2"
        >
          Edit Brand
        </v-card-title>

        <EditForm
          ref="editForm"
          @snackbarEvent="snackbarEvent"
          :item="editItem"
          :categories="categories"
          
          :selectedCategories="selectedCategories"
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
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CreateForm from "@/components/molecule/brand/Create";
import Table from "@/components/molecule/brand/Table";
import EditForm from "@/components/molecule/brand/Edit";
export default {
  name: "BrandPage",
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
      snackbar: false,
      text: "",
      editDialog:false,
      selectedIds:[],
      selectedCategories:[],
       snackbarColor:"",
      snackbarIcon:"",
      snackbarButtonColor:"",
    };
  },
  computed: {
    isFetchingBrand() {
      return this.$store.state.brand.isFetchingBrand;
    },
    brands() {
      return this.$store.state.brand.brands;
    },
    categories() {
      return this.$store.state.category.categories;
    },
    sellerId() {
      return this.$route.params.id;
    },
    seller() {
      return this.$store.state.seller.seller;
    },
    categoriesWithParent() {
      return this.$store.state.category.categoriesWithParent;
    },
  },
  methods: {
    ...mapActions([
      "singleSeller",
      "createBrand",
      "allBrand",
      "allCategory",
      "allCategoriesWithParent",
      "allSeller",
      "deleteBrand",
      "updateBrand"
    ]),
    closeDialog() {
      this.dialog = false;
      this.$refs.createForm.resetValidation();
      this.$refs.createForm.emptyForm();
    },

    async storeBrand(data) {
      let res = await this.createBrand(data);
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
      let res = await this.updateBrand(data);
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
        sellerId:this.$route.params.id,
        id: this.deleteId,
        _method: "delete",
      };
      let res = await this.deleteBrand(data);
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
        this.selectedIds = item.categories.map(i => {
          return i.id
        })
        this.editDialog = true;
        this.selectedCategories = [];
        this.selectedIds.forEach(selectedId => {
          this.categoriesWithParent.forEach(element => {
            if (element.id === selectedId) {
              this.selectedCategories.push({id:selectedId , name:element.name});
            }
          });


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
      snackbarEvent(data){
        // this.snackbar = data[0].snackbar;
        this.text = data[0].text
        this.snackBarConfig(false);
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
    this.allCategory(this.sellerId);
    this.allBrand(this.sellerId);
    this.allCategoriesWithParent(this.sellerId);
    this.singleSeller(this.sellerId);
  },
};
</script>

<style>