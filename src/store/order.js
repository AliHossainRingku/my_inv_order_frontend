import api from './api.js'

export  default {
    state: {
        nothing: '',
        orders              : [],
        isFetchingOrders    : false
    },
    mutations: {
        setOrders : (state, data) => {
            state.orders = data;
        },
        setFetchingState : (state, data) => {
            state.isFetchingOrders = data;
        }
    },
    actions: {
        // retrieving order
        async allOrders({ commit }){
            commit('setFetchingState', true)
            let response = await api('get', `api/orders`);
            //console.log(response)
            commit('setFetchingState', false)
            if (response) {
                commit('setOrders', response)
            }
        },

        async createOrder({ dispatch }, payload) {
            return new Promise((resolve, reject) => {
                
                api('post', `api/orders`, payload.formData).then(res => {
                    if (res) {
                        console.log(res)
                        dispatch('allOrders', payload)
                        resolve({ success: true, message: res.customer_id });
                    } else {
                        resolve({ success: false, message: res });
                        reject('');
                    }
                })
            })
        },

        async deleteOrder({ commit, dispatch }, data) {
            console.log(data.id)
            commit('setFetchingState', true)
            return new Promise((resolve, reject) => {
                api('delete', `api/orders/${data.id}`, data).then(res => {
                    console.log(res)
                    if (res) {
                        dispatch('allOrders', data)
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


        
        






    }

}