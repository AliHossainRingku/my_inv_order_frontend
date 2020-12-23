<template>
    <component :is="layout">
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
    </component>
</template>
<script>
  const default_layout = "master";
  export default {
    name: 'App',
    components: {
      
    },
    computed: {
      layout() {
        return (this.$route.meta.layout || default_layout) + "-layout";
      },
    },
    data: () => ({ 
      drawer: null 

    }),
    
  }
</script>

<style>
  .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>