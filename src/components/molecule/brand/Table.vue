<template>
  <div>
    <template>
      <v-progress-linear
        v-if="$store.state.brand.isFetchingBrand"
        indeterminate
        color="teal"
      ></v-progress-linear>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left">Brand Name</th>
              <th class="text-left">Categories</th>
              <th class="text-left">Icon</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody class="text-capitalize">
            <tr v-for="(item, i) in brands" :key="i">
              <td>{{ i + 1 }}</td>
              <td>{{ item.name }}</td>
              <td style="max-width:250px" >
                <span 
                  v-for="(category, j) in item.categories" 
                  :key="j"
                > 
                <v-chip
                  class="ma-1"
                  color="success"
                  outlined
                  small
                >
                  
                  {{category.name}} 
                </v-chip>
                  <!-- <span v-if="item.categories.length>1 && item.categories.length-1 != j">
                     ,
                  </span> -->
                </span>
              </td>
              <td class="mb-n8">
                <a 
                  :href="item.icon?`http://127.0.0.1:8000/storage/${item.icon}`:`https://cdn2.vectorstock.com/i/1000x1000/46/71/car-crash-test-icon-security-protect-in-traffic-vector-26574671.jpg`"
                  target="_blank"
                >
                  <img 
                    :src="item.icon?`http://127.0.0.1:8000/storage/${item.icon}`:`https://cdn2.vectorstock.com/i/1000x1000/46/71/car-crash-test-icon-security-protect-in-traffic-vector-26574671.jpg`" 
                    alt="Not Uploaded" 
                    height="60"
                    width="60" 
                    style="border: 2px solid #bfbfbf;margin-top: 5px;"
                  >
                </a>
              </td>
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
                    <span>Edit {{item.name}}</span>
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
  name: "BrandTable",
  components: {},
  props: {
    brands: {
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style>
</style>