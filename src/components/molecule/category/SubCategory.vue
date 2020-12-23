<template>
  <div v-if="SubCategories.length>0">
      <v-row class="mt-n8">
        <v-col cols="12">
          <label for="">Sub Category <span class="red--text">*</span></label>
          <v-select
           v-model="category_id"
            :items="SubCategories"
            item-text="name"
            item-value="id"
            dense
            outlined
            placeholder="Select Category"
            @change="changeSubCategory"
          >
          </v-select>
        </v-col>
      </v-row>
  </div>
</template>

<script>
// import { rules } from "@/data/rules.js";
export default {
  name: "SubCategorySelect",

  components: {
  },
  props: {
    SubCategories: {
      required: false
    },
    index: {
      required: false
    },
  },
  data() {
    return {
      category_id:''
    };
  },
  computed: {
    // rules() {
    //   return rules;
    // },
  },
  watch: {},
  methods: {
       changeSubCategory(e) {
        let categoryName =  this.SubCategories.filter(i => i.id == e)[0].name;
        let data = {
              sellerId: this.$route.params.id,
              categoryId: this.category_id,
              index : this.index,
              categoryName : categoryName,
              }
        this.$emit('changeSubCategory', data);
    },
  },
};
</script>