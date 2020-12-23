<template>
  <div>
    <template>
    <v-progress-linear
      v-if="$store.state.product.isFetchingProduct"
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
              Product Name
            </th>
            
            <th class="text-left">
              Price
            </th>
            
            <th class="text-left">
              Quantity
            </th>
            <th class="text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody class="text-capitalize">
          <tr
            v-for="(item, i) in products"
            :key="i"
          >
            <td>{{ i + 1}}</td>
            <td>{{ item.product_name }}</td>
            <td>{{ item.product_price}}</td>
            <td>{{ item.quantity}}</td>


            <td>

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
                <span>Edit {{item.name}}</span>
              </v-tooltip>
            
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                  v-bind="attrs"
                    v-on="on"
                    icon
                    @click="($emit('onDeleteItem', item.product_id))"
                    color="error"
                  >
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
                <span>Delete {{item.name}} ?</span>
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
    name: 'ProductTable',
    components:{

    },
    props:{
      products: {
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