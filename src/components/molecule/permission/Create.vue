<template>
  <div class="px-3 mt-3">
    <v-form v-model="valid" ref="form">

      <v-row class="mt-n5">
        <v-col cols="12">
          <label for="">Name <span class="red--text">*</span></label>
          <v-text-field
            v-model="name"
            :rules="rules.nameRules"
            dense
            outlined
            placeholder="Permission Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
   

    </v-form>

    <v-card-actions>
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" :loading="loading" outlined text @click="onClickCreate">
        Create
      </v-btn>
      <slot name="closeBtn"></slot>
    </v-card-actions>

  </div>
</template>

<script>
import { rules } from "@/data/rules.js";
export default {
  name: "CreatePermission",
  components: { },
  
  props: {
  },
  data() {
    return {
      name:'',
      valid: false,
      loading:false
    };
  },

  computed: {
    rules() {
      return rules;
    },
  },

  watch: {},

  methods: {

    // Form submission
    onClickCreate() {
      this.$refs.form.validate();
      if(this.$refs.form.validate()){
        var formData = new FormData();
        formData.append('name',  this.name);
       
        this.$emit('onCreate', formData);
        this.loadingHandle(true);
      }
    },



    resetValidation() {
      this.$refs.form.resetValidation();
    },

    emptyForm(){
      this.name = '';
    },

    loadingHandle(value) {
      this.loading = value
    },

  },
};
</script>