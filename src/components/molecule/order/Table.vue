<template>
  <div>
    <template>
    <v-progress-linear
      v-if="$store.state.order.isFetchingOder"
      indeterminate
      color="teal"
    ></v-progress-linear>
    <v-simple-table>

      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              #
            </th>
            <th class="text-left">
              Order ID
            </th>
            <th class="text-left">
              Customer ID
            </th>

            <th class="text-left">
              Product ID
            </th>

            <th class="text-left">
              Unit Price 
            </th>
    
            <th class="text-left">
              Quantity
            </th>

            <th class="text-left">
              Total Cost
            </th>
            <th class="text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody class="text-capitalize">
          <tr
            v-for="(item, i) in orders"
            :key="i"
          >
            <td>{{ i + 1}}</td>
            <td>{{ item.order_id}}</td>
            <td>{{ item.customer_id}}</td>
            <td>{{ item.product_id}}</td>
            <td>{{ item.unit_price}}</td>
            <td>{{ item.quantity}}</td>
            <td>{{ item.unit_price*item.quantity }}</td>

            <td>
    
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">            
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  color="green"
                  @click="$emit('onView', item)" 
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
                </template>
                <span>View {{item.customer_id}}</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">            
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  color="green"
                  @click="$emit('onEdit', item)" 
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                </template>
                <span>Edit {{item.id}}</span>
              </v-tooltip>
            
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                  v-bind="attrs"
                    v-on="on"
                    icon
                    @click="($emit('onDeleteItem', item.id))"
                    color="error"
                  >
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
                <span>Delete {{item.id}} ?</span>
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
  export default {
    name: 'OrderTable',
    
    props:{
      orders: {
        required: true
      }
    },
    data(){
      return{

      }
    },
    computed:{

    },
    watch:{

    },
    methods:{

    }
  }
</script>

<style>
  
</style>