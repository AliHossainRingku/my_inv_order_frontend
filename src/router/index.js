import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { layout: 'auth' }
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { layout: 'auth' }
  },

  {
    path: '/products',
    name: 'Product',
    component: () => import('../views/inventory/Product.vue')
  },

  {
    path: '/orders',
    name: 'Order',
    component: () => import('../views/inventory/seller/Order.vue')
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/inventory/seller/Dashboard.vue')
  },
 


]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  if (to.name !== 'Login') {

    if (localStorage.getItem('im_token')) {
      next();
    } else {
      if (to.name === 'Register') {
        next()
      }
      else {
        next('Login');
      }
      // EventBus.$emit('authLayout', true);
    }
  } else {
    next();
  }

});

export default router
