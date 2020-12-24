import api from './api.js'

export default {
    state: {
        nothing: '',
        products: [],
        isFetchingProduct: false,
        // storeloader: false
    },
    mutations: {
        setProducts(state, data) {
            state.products = data;
        },

        setFetchingState(state, value) {
            state.isFetchingProduct = value
        }
    },
    actions: {

        async allProducts({ commit }) {
            commit('setFetchingState', true)
            let response = await api('get', `api/products`);
            
            commit('setFetchingState', false)
            if (response) {
                console.log(response)
                commit('setProducts', response)
            }
        },
    
        async createProduct({ dispatch }, payload) {
            return new Promise((resolve, reject) => {
                //console.log("Hello")
                api('post', `api/products`, payload.formData).then(res => {
                    if (res) {
                        dispatch('allProducts', payload)
                        resolve({ success: true, message: res.product_name });
                    } else {
                        resolve({ success: false, message: res });
                        reject('');
                    }
                })
            })
        },


        async updateProduct({ dispatch }, payload) {
            return new Promise((resolve, reject) => {
                api('post', `api/products/${payload.itemId}`, payload.formData)
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
            console.log(data)
            commit('setFetchingState', true)
            return new Promise((resolve, reject) => {
                api('delete', `api/products/${data.id}`, data).then(res => {console.log(data.id)
                    if (res) {
                        dispatch('allProducts', data)
                        commit('setFetchingState', false)
                        resolve({ success: true, message: res });
                    } else {
                        commit('setFetchingState', false)
                        resolve({ success: false, message: res });
                        reject('');
                    }
                })
            })
        },

    },
    modules: {
    }
}