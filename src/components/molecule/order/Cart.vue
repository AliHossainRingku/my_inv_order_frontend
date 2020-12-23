<template>
  <div>
    <h4>Cart List</h4>
    <v-simple-table v-if="cartList.length > 0">
      <template v-slot:default>
        <thead>
          <tr>
            <th
              class="text-left"
              v-for="(option, key) in orderListOption"
              :key="key"
            >
              {{ option }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer, key) in cartList[0].customers" :key="key">
            <td>{{ customer.name }}</td>
            <td style="min-width: 130px">
              <span
                class="mx-1 my-1"
                v-for="(i, index) in customer.items"
                :key="index"
              >
                {{ ++index }}. {{ i.product.name }}
                <br />
              </span>
            </td>
            <td style="min-width: 130px">
              <span
                class="mx-1 my-1"
                v-for="(i, index) in customer.items"
                :key="index"
              >
                {{ i.store.name }}
                <br />
              </span>
            </td>
            <td>
              <span
                class="mx-1 my-1"
                v-for="(i, index) in customer.items"
                :key="index"
              >
                {{ i.quantity }}
                <br />
              </span>
            </td>
            <td>
              <span
                class="mx-1 my-1"
                v-for="(i, index) in customer.items"
                :key="index"
              >
                {{ i.vat?i.vat:0 }}%
                <br />
              </span>
            </td>
            <td>
              <span
                class="mx-1 my-1"
                v-for="(i, index) in customer.items"
                :key="index"
              >
                {{ (i.quantity*i.price)+((i.quantity*i.price)*i.vat/100) }}
                <br />
              </span>
            </td>
            <td>
              <span v-for="(i, index) in customer.items" :key="index">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      label
                      v-bind="attrs"
                      v-on="on"
                      icon
                      color="red"
                      @click="deleteCart(index, customer.id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Delete Item</span>
                </v-tooltip>
              </span>
            </td>
            <td>
              <span 
                v-for="(i, index) in customer.items"
                    :key="index"
              >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    label
                    v-bind="attrs"
                    v-on="on"
                    icon
                    class="ml-n7"
                    color="green"
                    @click="updateCart(index, customer.id, customer.name, i)"
                  
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit Item</span>
              </v-tooltip>
              </span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!--    if cart is empty-->
    <transition
      v-else
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
      <div class="text-green" style="width: 100%">
        <v-card
          outlined
          style="margin-left: auto; margin-right: auto; margin-top: 20px"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Empty Bag</div>
              <v-list-item-subtitle
                >No Product is In Cart List!
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>
    </transition>
    <!--    end section-->

    <!--  FOOTER  -->
    <v-card-actions class="mt-2 float-right" v-if="cartList.length > 0">
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" bottom text @click="placeOrder">
        Place Order
      </v-btn>
      <slot name="closeBtn"></slot>
    </v-card-actions>
    <!--  END FOOTER  -->
  </div>
</template>
<style lang="css">
.orderListRoot {
  border-left: 2px solid lightgreen;
}
</style>
<script>
export default {
  data() {
    return {};
  },

  // cartlist and orderList are passed through props.
  props: {
    cartList: Array,
    orderListOption: Array,
  },

  computed: {},

  methods: {
    // create a single order here.
    placeOrder() {
      this.$emit("placeOrder");
    },

    // delete a cart information from local storage.
    deleteCart(index, customerId) {
      let ids = {
        cartIndex: index,
        customerId: customerId,
        sellerId: this.$route.params.id,
      };
      this.$emit("deleteCartList", ids);
    },

    // update a cart information from local storage.
    updateCart(index, customerId, customerName, item) {
      let todos = {
        cartIndex: index,
        customerId: customerId,
        customerName: customerName,
        sellerId: this.$route.params.id,
      };
      this.$emit("updateCart", todos, item);
    },
  },

  mounted() {},
};
</script>