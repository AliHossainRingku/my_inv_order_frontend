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
            Customer Name
          </th>
          <th class="text-left">
            Phone 
          </th>
          <!-- <th class="text-left">
            Email
          </th> -->
          <th class="text-left">
            Address
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in customers" :key="index">
          <td>{{ index+1 }}</td>
          <td>{{ customer.name }}</td>
          <td>{{ customer.phone }}</td>
          <!-- <td>{{ customer.email }}</td> -->
          <td>{{ customer.address }}</td>
          <td>
            <v-btn
                icon
                color="green"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
                icon
                color="error"
            >
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
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
    name: 'CustomerTable',
    components:{

    },
    props:{
      customers: { 
        required: true
      }
    },
    data(){
      return{

      }
    },
    computed:{

    },
    methods:{

    }
  }
</script>

<style>
  
</style>