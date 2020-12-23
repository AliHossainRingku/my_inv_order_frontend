import api from './api.js'

export default {
	state: {
		nothing: '',
		stores: [],
		storeloader: false
	},
	mutations: {
		setStores(state, data) {
			state.stores = data;
		},

		storeLoader(state, value){
			state.storeloader = value
		}
	},
	actions: {
		async allStore({ commit }, id) {
			commit('storeLoader', true)
			let response = await api('get', `api/v1/admin/sellers/${id}/stores`);
			commit('storeLoader', false)
			if (response.success) {
				commit('setStores', response.data.data)
			}
		},

		async createStore({ dispatch }, payload) {
			return new Promise((resolve, reject) => {
				api('post', `api/v1/admin/sellers/${payload.id}/stores`, payload.formData).then(res => {
					if (res.success) {
						dispatch('allStore', payload.id)
						resolve({ success: true, message: res.message });
					} else {
						resolve({ success: false, message: res.message });
						reject('');
					}
				})
			})
		},

		async updateStore({ dispatch }, payload) {
			return new Promise((resolve, reject) => {
				api('post', `api/v1/admin/sellers/${payload.sellerId}/stores/${payload.storeId}`, payload.formData)
				.then(res => {
					if (res.success) {
						dispatch('allStore', payload.sellerId)
						resolve({ success: true, message: res.message });
					} else {
						resolve({ success: false, message: res.message });
						reject('');
					}
				})
			})
		},

		async deleteStore ({ commit, dispatch}, data) {
			commit('storeLoader', true)
			return new Promise ((resolve, reject) => {
				api('post', `api/v1/admin/sellers/${data.sellerId}/stores/${data.storeId}`, data).then(res => {
					if(res.success) {
						dispatch('allStore', data.sellerId)
						commit('storeLoader', false)
						resolve({success: true, message: res.message});
					}else{
						commit('storeLoader', false)
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