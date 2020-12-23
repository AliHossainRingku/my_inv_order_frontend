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
          dense
          disabled
          outlined
          placeholder="Role Name"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="mt-n6">
          <label for="">Select User <span class="red--text">*</span></label>
          <v-select
            v-model="userId"
            :items="users"
            item-text="name"
            item-value="id"
            :rules="rules.userRules"
            dense
            outlined
            placeholder="Select A User"
            required
          >
          </v-select>
        </v-col>
    </v-row>
    
    </v-form>

    <v-card-actions>
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn 
        color="green darken-1" 
        text
        :loading="loading"
        @click="assignRole"
      > 
        Update 
      </v-btn>
      <slot name="closeBtn"></slot>
    </v-card-actions>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { rules } from "@/data/rules.js";
export default {
  name: "AssignRolePage",
  components: {
   },

  props: {
    item: {
      required: true
    },
   
  },

  data() {
    return {
      name:'',
      userId:'',
      loading: false,
      valid: false,
    };
  },

  computed: {
      rules() {
      return rules;
    },
    users() {
      return this.$store.state.auth.users;
    }
  },

  methods: {
    ...mapActions([
      "allPermission", 
      "allUser", 
    ]),

    assignRole() {
      this.$refs.form.validate();
      if(this.$refs.form.validate()){
        var formData = new FormData();
        formData.append('user_id',  this.userId);

        let data = {
           roleId: this.item.id,
          formData: formData
        }
        this.$emit('createAssignRole', data);
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
      this.item.id = ""
      this.userId='';
    //   this.$refs.assignRoleForm.emptyForm();

    },

    loadingHandle(value) {
      this.loading = value
    },

  },
  
  mounted() {
    this.allUser();
  },
};
</script>