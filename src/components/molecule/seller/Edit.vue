<template>
  <div class="px-3 mt-3">
    <v-form 
      v-model="valid" 
      ref="form"
    >
      <label for="">Name <span class="red--text">*</span></label>
      <v-text-field
        v-model="item.name"
        :rules="rules.nameRules"
        dense
        outlined
        placeholder="seller Name"
        required
      ></v-text-field>
      
      <label for="">Logo</label>
      <v-file-input
        v-model="files"
        accept="image/png, image/jpeg, image/bmp"
        dense
        outlined
        @change="onFileChange"
       prepend-icon=""
      ></v-file-input>

      <p>Logo: {{ item.logo.slice(item.logo.lastIndexOf('/'))}}</p>
    </v-form>

    <v-card-actions>
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn 
        color="green darken-1" 
        :loading="loading"
        text 
        @click="onClickUpdate"
      >
        Update
      </v-btn>
      <slot name="closeBtn"></slot>
    </v-card-actions>
  </div>
</template>

<script>
import { rules } from "@/data/rules.js";
export default {
  name: "EditSeller",
  components: {},
  props: {
    item: {
      required: true
    }
  },
  data() {
    return {
      loading: false,
      valid: false,
      files: [],
      logo: ''
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
        formData.append('status',  this.item.status);
        formData.append('_method',  'put');
        if(this.logo){
          // console.log('image has changed');
          formData.append('logo', this.logo);
        }

        let data = {
          id: this.item.id,
          formData: formData
        }

        this.$emit('onUpdate', data);
        this.loadingHandle(true);
      }
    },
   
    emptyForm(){
      this.files = [];
      console.log(this.logo, 'dsd')
    },

    loadingHandle(value) {
      this.loading = value
    },

    onFileChange(e) {
      console.log(e)
      if(e == undefined){
        this.logo = '';
        return;
      }
      this.logo = e;
    }
  },

};
</script>