import api from './api.js'

export default {
	state: {
		nothing: '',
		sellers: [],
		seller: [],
		sellerInfo: [],
		sellerloader: false
	},
	mutations: {
		setSellers(state, data) {
			state.sellers = data;
		},

		setSeller(state, data) {
			state.seller = data;
		},

		setSellerInfo(state) {
			state.sellerInfo = JSON.parse(localStorage.getItem('seller_info'));
		},

		setSellerLoader(state, value){
			state.sellerloader = value
		}
	},
	actions: {
		async allSeller({ commit }) {

			commit('setSellerLoader', true)
			let response = await api('get', 'api/v1/admin/sellers');
			console.log(response);
			console.log("I got it.");
			commit('setSellerLoader', false)
			if (response.success) {
				commit('setSellers', response.data.data)
			}
		},

		async singleSeller({commit}, id) {
			commit('setSellerLoader', true);
			let response = await api('get', `api/v1/admin/sellers/${id}`);
			commit('setSellerLoader', false)
			if (response.success) {
				commit('setSeller', response.data)
			}
		},

		async createSeller({ dispatch }, payload) {
			return new Promise((resolve, reject) => {
				api('post', 'api/v1/admin/sellers', payload).then(res => {
					if (res.success) {
						dispatch('allSeller')
						resolve({ success: true, message: res.message });
					} else {
						resolve({ success: false, message: res.message });
						reject('');
					}
				})
			})
		},

		async updateSeller({ dispatch }, payload) {
			return new Promise((resolve, reject) => {
				api('post', `api/v1/admin/sellers/${payload.id}`, payload.formData)
				.then(res => {
					if (res.success) {
						dispatch('getAllOrder')
						resolve({ success: true, message: res.message });
					} else {
						resolve({ success: false, message: res.message });
						reject('');
					}
				})
			})
		},

		async deleteSeller ({ commit, dispatch}, data) {
			commit('setSellerLoader', true)
			return new Promise ((resolve, reject) => {
				api('post', `api/v1/admin/sellers/${data.id}`, data).then(res => {
					if(res.success) {
						dispatch('allSeller')
						commit('setSellerLoader', false)
						resolve({success: true, message: res.message});
					}else{
						commit('setSellerLoader', false)
						resolve({success: false, message: res.message});
						reject('');
					}
				})
			})
		}



	},
	modules: {
	}
}