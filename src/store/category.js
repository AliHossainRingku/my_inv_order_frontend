import api from './api.js'

export default {
	state: {
		categories: [],
		categoriesWithParent: [],
		subCategory: [],
		isFetchingCategory: false,
		categoryLoader: false
	},
	mutations: {
		setCategories(state, data) {
			state.categories = data;
		},
		setCategoriesWithParent(state, data) {
			state.categoriesWithParent = data;
		},
		setSubcategory(state, data) {
			state.subCategory = data;
		},
		setFetchingState(state, value) {
			state.isFetchingCategory = value
		},
		setCagegoryLoader(state, value){
			state.categoryLoader = value
		}
	},
	actions: {
		async allCategory({ commit },id) {
			// console.log(id);
			commit('setFetchingState', true)
			let response = await api('get', `api/v1/admin/sellers/${id}/categories`);
			if (response.success) {
				commit('setCategories', response.data.data)
			}
		},

		async allCategoriesWithParent({ commit },id) {
			commit('setFetchingState', true)
			let response = await api('get', `api/v1/admin/sellers/${id}/categories?parent_id=-1`);
			commit('setFetchingState', false)
			if (response.success) {
				commit('setCategoriesWithParent', response.data.data)
			}
		},

		async getSubCategory({ commit },data) {
			return new Promise((resolve, reject) => {
				api('get', `api/v1/admin/sellers/${data.sellerId}/categories?parent_id=${data.categoryId}`).then(res => {
					if (res.success) {
						resolve({ success: true, message: res.message });
						commit('setSubcategory', res.data.data)
					}else{
						resolve({ success: false, message: res.message });
						reject('');
					}
				})
			})
		},
		
		async updateCategory({ dispatch }, payload) {
			return new Promise((resolve, reject) => {
				api('post', `api/v1/admin/sellers/${payload.sellerId}/categories/${payload.categoryId}`, payload.formData)
					.then(res => {
						if (res.success) {
							dispatch('allCategoriesWithParent', payload.sellerId)
							resolve({ success: true, message: res.message });
						} else {
							resolve({ success: false, message: res.message });
							reject('');
						}
					})
			})
		},

		async createCategory({ dispatch }, payload) {
			return new Promise((resolve, reject) => {
				api('post', `api/v1/admin/sellers/${payload.sellerId}/categories`, payload.formData).then(res => {
					if (res.success) {
						dispatch('allCategoriesWithParent', payload.sellerId)
						resolve({ success: true, message: res.message });
					} else {
						resolve({ success: false, message: res.message });
						reject('');
					}
				})
			})
		},

		async deleteCategory ({ commit, dispatch}, data) {
			commit('setFetchingState', true)
			return new Promise ((resolve, reject) => {
				api('post', `api/v1/admin/sellers/${data.sellerId}/categories/${data.id}`, data).then(res => {
					if(res.success) {
						dispatch('allCategoriesWithParent', data.sellerId)
						commit('setFetchingState', false)
						resolve({success: true, message: res.message});
					}else{
						commit('setFetchingState', false)
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