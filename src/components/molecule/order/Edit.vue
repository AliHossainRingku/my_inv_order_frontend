<template>
  <div class="px-3 mt-3">
    <v-form v-model="valid" ref="form">
      <v-col class="mt-n2" cols="12">
        <label for="">Select Status <span class="red--text">*</span></label>
        <v-select
          v-model="selectedStatusId"
          :items="product.status"
          item-text="title"
          item-value="code"
          placeholder="Please Select One.."
          outlined
          dense
        ></v-select>
      </v-col>
      <transition name="slide-fade">
        <v-col class="mt-n7" cols="12" v-if="isCancelStatus">
          <label for="">Cancel Note <span class="red--text">*</span></label>
          <v-textarea
            v-model="cancelNote"
            outlined
            dense
            name="input-7-4"
            rows="2"
            row-height="15"
            placeholder="Please Write Cancellation Reason......"
            value=""
          ></v-textarea>
        </v-col>
      </transition>
    </v-form>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        :loading="loading"
        text
        @click="onClickUpdate"
      >
        Update
      </v-btn>
      <v-btn color="red darken-1" text @click="onClickClose"> Close </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { rules } from "@/data/rules.js";
import { mapActions } from "vuex";
export default {
  name: "EditOrderStatus",
  components: {},
  props: {
    item: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      valid: false,
      isCancelStatus: false,
      selectedStatusId: "",
      cancelNote: "",
      product: {
        status: [
          { title: "Pending", code: 2 },
          { title: "Approved", code: 1 },
          { title: "Cancelled", code: 0 },
          { title: "Delivered", code: 3 },
        ],
      },
    };
  },
  watch: {
    selectedStatusId(value) {
      if (value == 0) this.isCancelStatus = true;
      else this.isCancelStatus = false;
    },
  },
  computed: {
    rules() {
      return rules;
    },
    seller(){
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions(["updateStatus"]),

    /* action of clicking update button */
    async onClickUpdate() {
      if (this.$refs.form.validate()) {
        //validating form with roles

        var formData = new FormData(); // defining a form
        formData.append("cancel_note", this.cancelNote); // appending form data
        formData.append("status", this.selectedStatusId);
        formData.append("_method", "put");

        let data = {
          // capturing form and id in a single object
          sellerId : this.seller,
          id: this.item.id,
          formData: formData,
        };

        this.$refs.form.reset(); // reseting form
        this.$emit("onUpdateStatus", data); // emmiting update parent event with payload
        this.loadingHandle(false); //stop loading page.
      }
    },

    /* action of clicking close button */
    onClickClose() {
      this.$refs.form.reset(); // reseting form
      this.$emit("closeEditDialog"); // emmiting close button
    },

    emptyForm() {
      this.product.status = null;
    },

    loadingHandle(value) {
      this.loading = value;
    },
  },
};
</script>