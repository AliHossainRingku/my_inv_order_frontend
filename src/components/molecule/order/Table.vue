<template>
  <div>
    <template>
      <v-progress-linear
        v-if="$store.state.category.isFetchingCategory"
        indeterminate
        color="teal"
      ></v-progress-linear>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left pl-3">OrderId</th>
              <th class="text-left pl-3">Status</th>
              <th class="text-left">Customer</th>
              <th class="text-left">Stores</th>
              <th class="text-left">Products</th>
              <th class="text-left">Qty</th>
              <th class="text-left">Vat(%)</th>
              <th class="text-left">Price</th>
              <th class="text-left">Net Price</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, i) in orders" :key="i">
              <td>{{ i + 1 }}</td>
              <td style="max-width:15px">{{ order.order_code }}</td>
              <td>
                <v-tooltip right v-if="order.status == 0">
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip
                      label
                      v-bind="attrs"
                      v-on="on"
                      small
                      color="rgb(254, 202, 202)"
                    >
                      {{ "Cancelled" }}
                    </v-chip>
                  </template>
                  <span>Cancel Note: {{ order.cancel_note }}</span>
                </v-tooltip>
                <v-chip
                  small
                  color="rgb(167, 243, 208)"
                  label
                  v-else-if="order.status == 1"
                >
                  {{ "Approved" }}
                </v-chip>
                <v-chip
                  small
                  color="rgb(253, 230, 138)"
                  label
                  v-else-if="order.status == 2"
                >
                  {{ "Pending" }}
                </v-chip>
                <v-chip
                  small
                  color="rgb(191, 219, 254)"
                  label
                  v-else-if="order.status == 3"
                >
                  {{ "Delivered" }}
                </v-chip>
              </td>
              <td class="text-capitalize" style="min-width: 100px">
                {{ getCustomer(order.customer_id) }}
              </td>
              <td class="text-capitalize" style="min-width: 120px">
                <span v-for="(item, i) in order.items" :key="i">
                  {{ ++i }}. {{ item.store.name }}<br />
                </span>
              </td>

              <td class="text-capitalize" style="min-width: 120px">
                <span v-for="(item, i) in order.items" :key="i">
                  {{ ++i }}.{{ item.product.name }}
                  <br />
                </span>
              </td>
              
              <td>
                <span v-for="(item, i) in order.items" :key="i">
                  {{ item.quantity }}
                  <br />
                </span>
              </td>

              <td>
                <span v-for="(item, i) in order.items" :key="i">
                  {{ item.vat }} %
                  <br />
                </span>
              </td>

              <td>
                <span v-for="(item, i) in order.items" :key="i">
                  {{ item.product.price }}
                  <br />
                </span>
              </td>

              <td>
                <span v-for="(item, i) in order.items" :key="i">
                  {{ (item.quantity*item.product.price)+((item.quantity*item.product.price)*item.vat/100) }}
                  <br />
                </span>
              </td>

              

              <td>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      label
                      v-bind="attrs"
                      v-on="on"
                      icon
                      color="green"
                      @click="updateStatus(order)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Change Status</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "OrderTable",

  components: {},

  props: {
    categories: {
      required: false,
    },
    orders: {
      required: true,
    },
  },
  data() {
    return {
      orderStatus: "",
    };
  },
  computed: {
    sellerId() {
      return this.$route.params.id;
    },
    customers() {
      return this.$store.state.customer.customers;
    },
  },
  watch: {},
  methods: {
    ...mapActions(["getAllCustomer"]),
    updateStatus(order) {
      this.$emit("onEditClick", order);
    },
    getCustomer(id) {
      for (let start = 0; start < this.customers.length; start++) {
        if (this.customers[start].id == id) return this.customers[start].name;
      }
    },
  },
  mounted() {
    this.getAllCustomer();
  },
};
</script>

<style>
</style>