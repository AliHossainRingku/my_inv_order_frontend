<template>
  <div class="px-3 mt-3">
    <v-form 
      v-model="valid" 
      ref="form"
    >
      <label for="">Name <span class="red--text">*</span></label>
      <v-text-field
        v-model="seller.name"
        :rules="rules.nameRules"
        dense
        outlined
        placeholder="seller Name"
        required
      ></v-text-field>

      <!-- </v-select> -->
      <label for="">Logo</label>
      <v-file-input
        accept="image/png, image/jpeg, image/bmp"
        dense
        outlined
        placeholder="Upload A Logo"
        prepend-icon=""
        @change="onFileChange"
      ></v-file-input>
    </v-form>

    <v-card-actions>
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        :loading="loading"
        text
        @click="onClickCreate">
        Create
      </v-btn>

      <slot name="closeBtn"></slot>
    </v-card-actions>
  </div>
</template>

<script>
import { rules } from "@/data/rules.js";
export default {
  name: "CreateCategory",
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      seller: {
        name: "",
        logo: "",
        status: 1,
      },
      valid: false,
    };
  },
  computed: {
    rules() {
      return rules;
    },
  },
  watch: {},
  methods: {
    onClickCreate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        var formData = new FormData();
        formData.append("name", this.seller.name);
        formData.append("logo", this.seller.logo);
        formData.append("status", this.seller.status);
        this.$emit("onCreate", formData);
        this.loadingHandle(true);
        //console.log(this.category, 'dfdfdfdf')
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    emptyForm(){
      this.seller.icon = this.seller.name = '';
    },

    loadingHandle(value) {
      this.loading = value;
    },

    onFileChange(e) {
      console.log(e);
      if (e == undefined) {
        this.seller.logo = "";
        return;
      }
      this.seller.logo = e;
    }

  },

};
</script>