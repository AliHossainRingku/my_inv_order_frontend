<template>
  <div class="px-3 mt-3">
    <v-form 
      v-model="valid" 
      ref="form"
    >
      <v-row class="mt-n4">

        <v-col cols="6"
          ><label for="">Customer Name <span class="red--text">*</span></label>
          <v-text-field
            v-model="customerName"
            :rules="rules.nameRules"
            dense
            outlined
            placeholder="Customer Name"
            required
          ></v-text-field
        ></v-col>

        <v-col cols="4">
          <label for="">Email <span class="red--text">*</span></label>
          <v-text-field
            v-model="customerEmail"
            dense
            outlined
            placeholder="Enter Email"
          ></v-text-field>

          <v-text-field
            v-model="CustomerPhone"
            dense
            outlined
            placeholder="Enter Phone"
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
  name: "EditCustomer",
  components: {
  
  },
  props: {

  },
  data() {
    return {
      customerName  : "",
      customerEmail : "",
      customerPhone : "", 
      loading: false,
      valid: false,
    };
  },
  computed: {
    rules() {
      return rules;
    },
    sellerId() {
      return this.$route.params.id;
    }
  },
  methods: {
  },
  mounted(){}
}
</script>