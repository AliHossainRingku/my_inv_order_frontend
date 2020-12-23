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
              Category
            </th>
            <th class="text-left">
              Brand
            </th>
            <th class="text-left">
              Thumbnail
            </th>
            
            <th class="text-left">
              Price
            </th>
            
            <th class="text-left">
              Vat (%)
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
            <td>{{ item.name }}</td>
            <td>{{ item.category?item.category.name:'' }}</td>
            <td>{{ item.brand?item.brand.name:''}}</td>
            <td> 
                <!-- {{item.images[0].path?item.images[0].path:'Not found'}} -->
                <a 
                    :href="`http://127.0.0.1:8000/storage/${item.thumbnail}`"
                    target="_blank"
                  >
                    <img 
                      :src="`http://127.0.0.1:8000/storage/${item.thumbnail}`" 
                      alt="Not Uploaded" 
                      height="60"
                      width="60" 
                      style="margin-top: 5px;"
                    >
                  </a>
              </td>
            <td>{{ item.price}}</td>
            <td>{{ item.vat?item.vat+ ' %':'0 %'}}</td>


            <td>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    color="blue"
                    @click="$emit('onStock', item.id)" 
                    >
                      <v-icon>mdi-playlist-plus</v-icon>
                  </v-btn>
                </template>
                <span>Stock {{item.name}}</span>
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
                <span>Edit {{item.name}}</span>
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