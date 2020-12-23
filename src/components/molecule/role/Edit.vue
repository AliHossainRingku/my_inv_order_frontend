<template>
  <div class="px-3 mt-3">
    <v-form 
      v-model="valid" 
      ref="form"
    >
    <v-row class="mt-n4">
      <v-col cols="12">
        <label for="">Role Name <span class="red--text">*</span></label>
        <v-text-field
          v-model="item.name"
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
        :itemPermissions='itemPermissions'
        @changeSelect="changeSelect"
      />
    </v-form>

    <v-card-actions>
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn 
        color="green darken-1" 
        text
        :loading="loading"
        @click="onClickUpdate"
      > 
        Update 
      </v-btn>
      <slot name="closeBtn"></slot>
    </v-card-actions>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SelectPermission from "@/components/molecule/role/SelectPermission";
import { rules } from "@/data/rules.js";
export default {
  name: "EditRole",
  components: {
      SelectPermission
   },

  props: {
    item: {
      required: true
    },
    itemPermissions:{
      required:true
    }
  },

  data() {
    return {
      name:'',
      selectedPermissions:[],
      loading: false,
      valid: false,
    };
  },

  computed: {
    rules() {
      return rules;
    },
    permissions() {
      return this.$store.state.permission.permissions;
    },
  },

  methods: {
    ...mapActions([
      "allPermission", 
    ]),

    onClickUpdate() {
      this.$refs.form.validate();
      if(this.$refs.form.validate()){
        var formData = new FormData();
        formData.append('name',  this.item.name);
        let permissions ='';
        this.selectedPermissions.forEach((element,index) => {
          permissions += parseInt(element);
          if (this.selectedPermissions.length - 1 != index) {
              permissions+=",";
          }
        });
        formData.append('permissions',  permissions);
        formData.append('_method',  'put');
        let data = {
          roleId: this.item.id,
          formData: formData
        }
        this.$emit('onUpdate', data);
        this.loadingHandle(true);
      }
    },

    changeSelect(selectedPermissions){
      this.selectedPermissions=selectedPermissions;
    },

    changePerm(){
      this.selectAll=false;
    },

    emptyForm(){
      this.item.name = ""
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