import api from './api.js'

export default {
    state: {
        nothing: '',
        products: [],
        isFetchingProduct: false,
        // storeloader: false
    },
    mutations: {
        setproducts(state, data) {
            state.products = data;
        },

        setFetchingState(state, value) {
            state.isFetchingProduct = value
        }
    },
    actions: {

        async allProducts({ commit }, sellerId) {
            commit('setFetchingState', true)
            let response = await api('get', `api/v1/admin/products?seller_id=${sellerId}`);
            commit('setFetchingState', false)
            if (response.success) {
                commit('setproducts', response.data.data)
            }
        },
        async filterPoduct({ commit }, queryString) {
            commit('setFetchingState', true)
            let response = await api('get', `api/v1/admin/products?${queryString}`);
            commit('setFetchingState', false)
            if (response.success) {
                commit('setproducts', response.data.data)
            }
        },


        async createProduct({ dispatch }, payload) {
            return new Promise((resolve, reject) => {
                api('post', `api/v1/admin/products`, payload.formData).then(res => {
                    if (res.success) {
                        dispatch('allProducts', payload.sellerId)
                        resolve({ success: true, message: res.message });
                    } else {
                        resolve({ success: false, message: res.message });
                        reject('');
                    }
                })
            })
        },


        async updateProduct({ dispatch }, payload) {
            return new Promise((resolve, reject) => {
                api('post', `api/v1/admin/products/${payload.itemId}`, payload.formData)
                    .then(res => {
                        if (res.success) {
                            dispatch('allProducts', payload.sellerId)
                            resolve({ success: true, message: res.message });
                        } else {
                            resolve({ success: false, message: res.message });
                            reject('');
                        }
                    })
            })
        },

        async deleteProduct({ commit, dispatch }, data) {
            commit('setFetchingState', true)
            return new Promise((resolve, reject) => {
                api('post', `api/v1/admin/products/${data.id}`, data).then(res => {
                    if (res.success) {
                        dispatch('allProducts', data.sellerId)
                        commit('setFetchingState', false)
                        resolve({ success: true, message: res.message });
                    } else {
                        commit('setFetchingState', false)
                        resolve({ success: false, message: res.message });
                        reject('');
                    }
                })
            })
        },
        async stockProduct({ commit},data) {
            return new Promise((resolve, reject) => {
                api('post', `api/v1/admin/products/${data.productId}/stocks`, data.formData).then(res => {
                    if (res.success) {
                        commit('', false)
                        resolve({ success: true, message: res.message });
                    } else {
                        resolve({ success: false, message: res.message });
                        reject('');
                    }
                })
            })
        },

    },
    modules: {
    }
}