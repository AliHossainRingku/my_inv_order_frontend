<template>
  <div>
    <template>
      <v-progress-linear
        v-if="$store.state.permission.isFetchingPermission"
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
              Permission Name
              </th>
            
              <th class="text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="text-capitalize">
            <tr
              v-for="(item, i) in permissions"
              :key="i"
            >
              <td>{{ i + 1}}</td>
              <td>{{ item.name }}</td>
              
              <td>
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
                      @click="($emit('onDeleteItem', item.id))"
                      icon
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
    name: 'PermissionTable',
    components:{

    },
    props:{
      permissions: {
        required: true
      }
    },
    data(){
      return{

      }
    },
    computed:{
      // sellerId() {
      //       return this.$route.params.id
      //     }
    },
    watch:{

    },
    methods:{

    }
  }
</script>

<style>
  
</style>