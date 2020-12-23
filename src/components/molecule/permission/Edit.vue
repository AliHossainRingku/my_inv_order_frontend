<template>
  <div class="px-3 mt-3">
    <v-form 
      v-model="valid" 
      ref="form"
    >
    <v-row class="mt-n4">
      <v-col cols="12">
        <label for="">Permission Name <span class="red--text">*</span></label>
        <v-text-field
          v-model="item.name"
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
// import { mapActions } from "vuex";
import { rules } from "@/data/rules.js";
export default {
  name: "EditPermission",
  components: { },
  props: {
    item: {
      required: true
    },
  },
  data() {
    return {
      loading: false,
      valid: false,
    };
  },
  computed: {
    rules() {
      return rules;
    },

    
  },
  methods: {
  
    onClickUpdate() {
    
      this.$refs.form.validate();

      if(this.$refs.form.validate()){
        var formData = new FormData();
        formData.append('name',  this.item.name);
        formData.append('_method',  'put');
        let data = {
          // sellerId: this.sellerId,
          permissionId: this.item.id,
          formData: formData
        }
        this.$emit('onUpdate', data);
        this.loadingHandle(true);
      }
    },

    emptyForm(){
      this.item.name = ""
    },
    loadingHandle(value) {
      this.loading = value
    },
  },

};
</script>