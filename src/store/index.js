import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.js'
import seller from './seller.js'
import product from './product.js'
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
		seller,
		product,
		order,
		customer
	}
})
