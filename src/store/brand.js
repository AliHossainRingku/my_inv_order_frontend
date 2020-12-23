import api from './api.js'

export default {
    state: {
        nothing: '',
        brands: [],
        categoryDependentBrands: [],
        isFetchingBrand: false
    },
    mutations: {
        setbrands(state, data) {
            state.brands = data;
        },

        setcategoryDependentBrands(state, data) {
            state.categoryDependentBrands = data;
        },

        setFetchingState(state, value) {
            state.isFetchingBrand = value
        }
    },
    actions: {

        async allBrand({ commit }, id) {
            commit('setFetchingState', true)
            let response = await api('get', `api/v1/admin/sellers/${id}/brands`);
            commit('setFetchingState', false)
            if (response.success) {
                commit('setbrands', response.data.data)
            }
        },
        
        

        async createBrand({ dispatch }, payload) {
            return new Promise((resolve, reject) => {
                api('post', `api/v1/admin/sellers/${payload.sellerId}/brands`, payload.formData).then(res => {
                    if (res.success) {
                        dispatch('allBrand', payload.sellerId)
                        resolve({ success: true, message: res.message });
                    } else {
                        resolve({ success: false, message: res.message });
                        reject('');
                    }
                })
            })
        },


        async updateBrand({ dispatch }, payload) {
            return new Promise((resolve, reject) => {
                api('post', `api/v1/admin/sellers/${payload.sellerId}/brands/${payload.itemId}`, payload.formData)
                    .then(res => {
                        if (res.success) {
                            dispatch('allBrand', payload.sellerId)
                            resolve({ success: true, message: res.message });
                        } else {
                            resolve({ success: false, message: res.message });
                            reject('');
                        }
                    })
            })
        },

        async deleteBrand ({ commit, dispatch}, data) {
            commit('setFetchingState', true)
            return new Promise ((resolve, reject) => {
                api('post', `api/v1/admin/sellers/${data.sellerId}/brands/${data.id}`, data).then(res => {
                    if(res.success) {
                        dispatch('allBrand', data.sellerId)
                        commit('setFetchingState', false)
                        resolve({success: true, message: res.message});
                    }else{
                        commit('setFetchingState', false)
                        resolve({success: false, message: res.message});
                        reject('');
                    }
                })
            })
        },


        async categoryDependentBrand({ commit }, data) {
            let response = await api('get', `api/v1/admin/sellers/${data.sellerId}/brands?category_id=${data.categoryId}`);
            commit('setcategoryDependentBrands', response.data.data)
        }


    },
    modules: {
    }
}