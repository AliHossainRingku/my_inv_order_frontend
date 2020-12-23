import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

// import axios from 'axios'

import MasterLayout from './components/layout/MasterLayout';
import AuthLayout from './components/layout/AuthLayout';
Vue.component('master-layout', MasterLayout);
Vue.component('auth-layout', AuthLayout);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
