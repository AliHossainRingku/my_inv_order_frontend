import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.js'
import category from './category.js'
import seller from './seller.js'
import brand from './brand.js'
import store from './store.js'
import product from './product.js'
import permission from './permission.js'
import role from './role.js'
import order from './order.js'
import customer from './customer.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		auth,
		category,
		seller,
		brand,
		store,
		product,
		permission,
		role,
		order,
		customer
	}
})
