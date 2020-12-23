<template>
  <div class="px-3 mt-3">
    <v-form 
      v-model="valid" 
      ref="form"
    >
      <label for="">Name <span class="red--text">*</span></label>
      <v-text-field
        v-model="store.name"
        :rules="rules.nameRules"
        dense
        outlined
        placeholder="Store Name"
        required
      ></v-text-field>

      <label for="">Address <span class="red--text">*</span></label>
      <v-textarea
        v-model="store.address"
        :rules="rules.addressRules"
        dense
        outlined
        name="input-7-4"
        rows="1"
        row-height="15"
      ></v-textarea>
      <label for="">Latitude <span class="red--text">*</span></label>
      <v-text-field
        v-model="store.lat"
        :rules="rules.latitudeRules"
        dense
        outlined
        placeholder="Latitude"
        required
      ></v-text-field>
      <label for="">Longitude <span class="red--text">*</span></label>
      <v-text-field
        v-model="store.long"
        :rules="rules.longitudeRules"
        dense
        outlined
        placeholder="Longitude"
        required
      ></v-text-field>
    </v-form>

    <v-card-actions>
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn 
        color="green darken-1" 
        text
        :loading="loading"
        @click="onClickCreate"
      > 
        Create 
      </v-btn>
      <slot name="closeBtn"></slot>
    </v-card-actions>
  </div>
</template>

<script>
import { rules } from "@/data/rules.js";
export default {
  name: "CreateProduct",

  components: {},
  props: {},
  data() {
    return {
      store: {
        name: "",
        address: '',
        lat: '',
        long: '',
      },
      valid: false,
      loading: false
    };
  },
  computed: {
    rules() {
      return rules;
    },
    sellerId(){
      return this.$route.params.id;
    },
  },
  watch: {},
  methods: {
    onClickCreate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        var formData = new FormData();
        formData.append("name", this.store.name);
        formData.append("address", this.store.address);
        formData.append("lat", this.store.lat);
        formData.append("long", this.store.long);

        let data = {
          id: this.sellerId,
          formData: formData
        }
        this.$emit("onCreate", data);
        this.loadingHandle(true);
        //console.log(this.category, 'dfdfdfdf')
      }
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },

     emptyForm(){
      this.store.name = this.store.address  = this.store.lat = this.store.long = "";
    },

    loadingHandle(value) {
      this.loading = value;
    },

  },
};
</script>