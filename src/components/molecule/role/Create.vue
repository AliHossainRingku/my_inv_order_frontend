<template>
  <div class="px-3 mt-3">
    <v-form v-model="valid" ref="form">

      <v-row class="mt-n2">
        <v-col cols="12">
          <label for="">Role Name <span class="red--text">*</span></label>
          <v-text-field
            v-model="name"
            :rules="rules.nameRules"
            dense
            outlined
            placeholder="Role Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    
    <SelectPermission
    ref="permissionSelection"
        :permissions='permissions'
        :itemPermissions="itemPermissions"
        @changeSelect="changeSelect"
    />
    </v-form>

    <v-card-actions>
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" :loading="loading" outlined text @click="onClickCreate">
        Create
      </v-btn>
      <slot name="closeBtn"></slot>
    </v-card-actions>
<!-- {{ selectedPermissions}} -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SelectPermission from "@/components/molecule/role/SelectPermission";
import { rules } from "@/data/rules.js";
export default {
  name: "CreateRole",
  components: {
      SelectPermission
   },
  props: {},
  data() {
    return {
      itemPermissions:[],
      name:'',
      selectedPermissions:[],
      valid: false,
      loading:false,
    };
  },
  computed: {
    rules() {
      return rules;
    },
    permissions() {
      return this.$store.state.permission.permissions;
    }
  },
  watch: {},
  methods: {
    ...mapActions([
    "allPermission", 
    ]),

    // Form submission
    onClickCreate() {
      this.$refs.form.validate();
      if(this.$refs.form.validate()){
        var formData = new FormData();
        formData.append('name',  this.name);
        let permissions ='';
        this.selectedPermissions.forEach((element,index) => {
          permissions += parseInt(element);
          if (this.selectedPermissions.length - 1 != index) {
            permissions+=',';
          }
        });
        formData.append('permissions',  permissions);
        this.$emit('onCreate', formData);
        this.loadingHandle(true);
      }
    },

    changeSelect(selectedPermissions){
      this.selectedPermissions=selectedPermissions;
    },
    changePerm(){
      this.selectAll=false;
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },

    emptyForm(){
      this.name = '';
      this.selectedPermissions=[];
      this.$refs.permissionSelection.emptyForm();
    },

    loadingHandle(value) {
      this.loading = value
    },
  },
  mounted() {
    this.allPermission();
  },
};
</script>