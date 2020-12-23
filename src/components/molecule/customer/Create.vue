<template>
  <div class="px-3 mt-3">
    <v-form v-model="valid" ref="form">
      <v-row class="mt-n4">
        <v-col cols="12">
          <label for="">Customer Name <span class="red--text">*</span></label>
          <v-text-field
            v-model="customer.name"
            :rules="rules.nameRules"
            dense
            outlined
            placeholder="Customer Name"
            required
          ></v-text-field
        ></v-col>
      </v-row>

      <!-- <v-row class="mt-n8">
        <v-col cols="12">
          <label for="">Customer Email <span class="red--text">*</span></label>
          <v-text-field
            v-model="customer.email"
            :rules="rules.nameRules"
            dense
            outlined
            placeholder="Customer email"
            required
          ></v-text-field
        ></v-col>
      </v-row> -->

      <v-row class="mt-n8">
        <v-col cols="12">
          <label for="">Customer phone <span class="red--text">*</span></label>
          <v-text-field
            v-model="customer.phone"
            :rules="rules.nameRules"
            dense
            outlined
            placeholder="Customer phone"
            required
          ></v-text-field
        ></v-col>
      </v-row>
      <v-row class="mt-n8">
        <v-col cols="12">
          <label for=""
            >Customer address <span class="red--text">*</span></label
          >
          <v-textarea
            v-model="customer.address"
            :rules="rules.nameRules"
            dense
            outlined
            placeholder="Customer address "
            required
            name="input-7-4"
            rows="2
            "
            row-height="15"
          ></v-textarea
        ></v-col>
      </v-row>
    </v-form>

    <v-card-actions class="mt-n3">
      <h5 class="red--text">* Marked fields are required.</h5>
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        text
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
  name: "CreatCustomer",

  data() {
    return {
      customer: {
        name: "",
        email: "",
        phone: "",
        address: "",
      },
      valid: false,
      loading: false,
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
      if (this.$refs.form.validate()) {
        let formData = new FormData();
        formData.append("name", this.customer.name);
        formData.append("phone", this.customer.phone);
        // formData.append("email", this.customer.email);
        formData.append("address", this.customer.address);

        let data = {
          formData: formData,
        };

        this.$emit("onCreate", data);
        // this.$refs.form.reset();
        this.loadingHandle(true);
      }
    },
     emptyForm(){
      this.customer.name = 
      this.customer.phone = 
      this.customer.address = "";
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },

    loadingHandle(value) {
      this.loading = value;
    },
  },
};
</script>