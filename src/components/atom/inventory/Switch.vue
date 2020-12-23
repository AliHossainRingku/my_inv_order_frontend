<template>
  <v-switch
    v-model="value"
    flat
  ></v-switch>
</template>

<script>
  export default {
    name: 'Switch',
    components:{

    },
    props:{
      sid: {
        required: true
      }
    },
    data(){
      return{ 
      }
    },
    computed:{
      sellerId(){
        return this.$route.params.id
      },
      value() {
        return this.sellerId == this.sid ? true : false;
      }
    },
    watch:{

    },
    methods:{

    }
  }
</script>

<style>
  
</style>