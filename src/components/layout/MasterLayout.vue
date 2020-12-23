<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="!isHome"
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Dashboard
          </v-list-item-title>
          <v-list-item-subtitle>
              <v-btn
                style="text-transform: none; padding: 10px 2px;"
                text
                @click="open=!open"
              >
              USER NAME
              <v-icon>{{open==false ? 'mdi-menu-right' : 'mdi-menu-down'}}</v-icon>
                
              </v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <Sidebar />
      
    </v-navigation-drawer>

    <v-app-bar v-if="!isHome" app dense flat>
      <v-app-bar-nav-icon 
        @click="drawer = !drawer">
      </v-app-bar-nav-icon>

      <v-toolbar-title>IMS</v-toolbar-title>
     
      <v-spacer></v-spacer>

      
      <button
        @click="logout"
        text 
        color="error">Logout
      </button>
    </v-app-bar>

    <v-main>
      <!-- <transition name="slide-fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition> -->
      <slot />
    </v-main>
  </v-app>
</template>

<script>
  import Sidebar from '@/components/atom/inventory/Sidebar'
  export default {
    name: 'MasterLayout',
    components: {
      Sidebar
    },
    data: () => ({ 
      drawer: null,
      open: false
    }),
    computed: {
      isHome(){
        return this.$route.fullPath == '/' ? true : false
      }
    },
    methods: {
      
      logout(){
        localStorage.removeItem('im_token');
        localStorage.removeItem('user');
        localStorage.removeItem('seller_info');
        this.$router.push('/login');
      }
    }
  }
</script>