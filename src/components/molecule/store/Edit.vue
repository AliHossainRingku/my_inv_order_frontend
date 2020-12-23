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
        placeholder="Store Name"
        required
      ></v-text-field>

      <label for="">Address <span class="red--text">*</span></label>
      <v-textarea
        v-model="item.address"
        :rules="rules.addressRules"
        dense
        outlined
        name="input-7-4"
        rows="1"
        row-height="15"
      ></v-textarea>
      <label for="">Latitude <span class="red--text">*</span></label>
      <v-text-field
        v-model="item.lat"
        :rules="rules.latitudeRules"
        dense
        outlined
        placeholder="Latitude"
        required
      ></v-text-field>
      <label for="">Longitude <span class="red--text">*</span></label>
      <v-text-field
        v-model="item.long"
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
    sellerId(){
      return this.$route.params.id;
    },
  },
  methods: {
    onClickUpdate() {
      this.$refs.form.validate();

      if(this.$refs.form.validate()){
        var formData = new FormData();

        formData.append('name',  this.item.name);
        formData.append('address',  this.item.address);
        formData.append('lat',  this.item.lat);
        formData.append('long',  this.item.long);
        formData.append('status',  1);
        formData.append('_method',  'put');
        

        let data = {
          sellerId: this.sellerId,
          storeId: this.item.id,
          formData: formData
        }

        this.$emit('onUpdate', data);
        this.loadingHandle(true);
      }
    },

    loadingHandle(value) {
      this.loading = value
    },
  },

};
</script>