<template>
  <div>
    <template>
      <v-progress-linear
        v-if="$store.state.seller.sellerloader"
        indeterminate
        color="teal"
      ></v-progress-linear>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left">Name</th>
              <th class="text-right">Action</th>
            </tr>
          </thead>
          <tbody class="text-capitalize">
            <tr v-for="(item, i) in sellers" :key="i">
              <td>
                <span :class="`${item.id == sellerId ? 'active' : ''}`">{{ i + 1 }}</span>
              </td>
              <td>
                  {{ item.name }}
              </td>

              <td>
                <div class="d-flex justify-end align-end">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        @click="switchSeller(item)"
                        text
                        outlined
                        :color="`${item.id == $route.params.id ? 'green' : 'ray'}`"
                        :disabled="false"
                      >
                        Switch
                      </v-btn>
                    </template>
                    <span>Switch to {{item.name}} ?</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on" 
                        @click="$emit('onEdit', item)" 
                        icon
                        color="green"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      
                    </template>
                    <span>Edit {{item.name}} </span>
                  </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on" 
                      @click="$emit('onDeleteItem', item.id)" 
                      icon 
                      color="error"
                    >
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Delete {{item.name}} </span>
                </v-tooltip>
               
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "CategoryTable",
  components: {
  },
  props: {
    sellers: {
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    sellerId() {
      return this.$route.params.id;
    }
  },
  watch: {},
  methods: {
    ...mapMutations([
      'setSellerInfo'
    ]),

    switchSeller(item){
      localStorage.setItem('seller_info', JSON.stringify(item));
      this.setSellerInfo();
      this.$router.push(`/sellers/${item.id}`)
    }
  },
};
</script>

<style lang=scss>
  .im-a-tag{
    text-decoration: none;
  }
  .active{
    border: 2px solid #0bea0b;
    padding: 2px 7px;
    border-radius: 50%;
    background: #e5ffe5;
    margin-left: -8px;
  }
</style>
