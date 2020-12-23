<template>
  <v-hover
    v-slot="{ hover }"
  >
  <v-card
   :elevation="hover ? 5 : 1"
    color="blue lighten-5"
    class="mx-auto pt-3"
    outlined
  >
    <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            :src="`http://127.0.0.1:8000/storage/${item.logo}`"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn
        color="green"
        text
      >
        Visite
      </v-btn>
    </v-card-actions>
  </v-card>
</v-hover>
</template>

<script>
  export default {
    name: 'SellerCard',
    props: {
      item: {
        required: true
      }
    }
  }
</script>