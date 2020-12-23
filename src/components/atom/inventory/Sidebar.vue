<template>
  <div>
    <v-list dense nav>
      <v-list-item 
        v-for="item in items" 
        :key="item.title" 
        :to="`/seller/${sellerId}${item.link}`" 
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

     

      <v-list-item 
        :to="`/sellers/${sellerId}`" 
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-office-building-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Seller</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { menus } from "@/data/sidenav.js";
export default {
  name: "Sidebar",
  data() {
    return {};
  },
  computed: {
    items() {
      return menus;
    },
    sellerId() {
      return this.$route.params.id
    }
  },
};
</script>