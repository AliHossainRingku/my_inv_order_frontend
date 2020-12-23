import api from "@/store/api";

export default {
    state: {
        customers           : {},
        isFetchingCustomers : false
    },

    getters:{
        getCustomers (){
        }
    },

    mutations: {
        setCustomers    :   (state, data) => {
            state.customers = data;
        },
        setFetchingState:   (state, data) => {
            state.isFetchingOrders = data;
        }
    },

    actions: {

        // storing placed customer.
        async addCustomer( { dispatch }, payload){
            return new Promise((resolve, reject) => {
                api('post', `api/v1/admin/customers`, payload.formData).then(res => {
                    if (res.success) {
                        dispatch('getAllCustomer')
                        resolve({ success: true, message: res.message });
                    } else {
                        resolve({ success: false, message: res.message });
                        reject('');
                    }
                })
            })
        },

        // retrieving customer
        async getAllCustomer({ commit }){
            commit('setFetchingState', true)
            let response = await api('get', `api/v1/admin/customers`);
            commit('setFetchingState', false)
            if (response.success) {
                commit('setCustomers', response.data)
                console.log(response.data)
            }
        },

    }
}