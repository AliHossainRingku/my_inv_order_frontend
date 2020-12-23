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
    path: '/seller/:id/products',
    name: 'Product',
    component: () => import('../views/inventory/Product.vue')
  },

  {
    path: '/seller',
    name: 'Seller',
    component: () => import('../views/inventory/seller/index.vue')
  },
  {
    path: '/sellers/:id',
    name: 'SingeSeller',
    component: () => import('../views/inventory/seller/id.vue')
  },
  {
    path: '/seller/:id/stores',
    name: 'Store',
    component: () => import('../views/inventory/seller/Store.vue')
  },
  {
    path: '/seller/:id/categories',
    name: 'Category',
    component: () => import('../views/inventory/seller/Category.vue')
  },
  {
    path: '/seller/:id/brands',
    name: 'Brand',
    component: () => import('../views/inventory/seller/Brand.vue')
  },
  
  {
    path: '/seller/:id/customers',
    name: 'Customer',
    component: () => import('../views/inventory/seller/Customer.vue')
  },
  {
    path: '/seller/:id/orders',
    name: 'Order',
    component: () => import('../views/inventory/seller/Order.vue')
  },
  {
    path: '/seller/:id/orders',
    name: 'Order',
    component: () => import('../views/inventory/seller/Order.vue')
  },
  {
    path: '/seller/:id/dashboard',
    name: 'Dashboard',
    component: () => import('../views/inventory/seller/Dashboard.vue')
  },
  {
    path: '/seller/:id/permissions',
    name: 'Permission',
    component: () => import('../views/inventory/Permission.vue')
  },
  {
    path: '/seller/:id/roles',
    name: 'Role',
    component: () => import('../views/inventory/Role.vue')
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
