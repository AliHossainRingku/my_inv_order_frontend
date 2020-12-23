import api from './api.js'

export  default {
    state: {
        orders              : [],
        isFetchingOrders    : false,
        isCacheEmpty        : true,
        cartInfos           : []
    },
    mutations: {
        setOrders : (state, data) => {
            state.orders = data;
        },
        setCacheIsEmpty : (state, data) => {
            state.isCacheEmpty = data
        },
        setFetchingState : (state, data) => {
            state.isFetchingOrders = data;
        },
        setCartInfos : (state, data) => {
            state.cartInfos = data;
        }
    },
    actions: {

        // storing placed order.
        async storeOrder( { dispatch }, payload ){
            console.log('Executor :: I am in storeOrder func');
            return new Promise((resolve , reject) => {
                api('post', 'api/v1/admin/orders', payload.formData).then(res => {
                    if (res.success){
                        localStorage.removeItem('myCart');
                        dispatch('getFromCartStore', payload.seller_id)
                        dispatch('getAllOrder', payload.seller_id)
                        resolve({ success: true, message: res.message });
                    }
                    else {
                        console.log(res.message)
                        resolve({ success: false, message: res.message });
                        reject('Order creating Failed!');
                    }
                });
            });
        },

        // retrieving order
        async getAllOrder({ commit },sellerId){
            commit('setFetchingState', true)
            let response = await api('get', `api/v1/admin/orders?seller_id=${sellerId}`);
            commit('setFetchingState', false)
            if (response.success) {
                commit('setOrders', response.data.data)
            }
        },

        // update Order
        async updateStatus({ dispatch }, payload) {
            return new Promise((resolve, reject) => {
                console.log('Update in order.jd')
                api('post', `api/v1/admin/orders/${payload.id}/status`, payload.formData)
                    .then(res => {
                        if (res.success) {
                            dispatch('getAllOrder', payload.sellerId);
                            resolve({ success: true, message: res.message });
                        } else {
                            resolve({ success: false, message: res.message });
                            reject('Order Is Not Updated Successfully!');
                        }
                    })
            })
        },

        // add to cart
        async addToCartStore({ commit, dispatch }, payload){
            // console.log(payload);
            let cachedOrder = localStorage.getItem('myCart')
            // console.log('got in')
            // if data localstorage empty
            if (!cachedOrder){
                console.log('null in store order')
                let orders = [];
                orders.push(payload);
                commit("setCacheIsEmpty", false)
                localStorage.setItem('myCart', JSON.stringify(orders))
                dispatch('getFromCartStore', payload.sellerId)
            }

            // if data exists in local storage
            else{
                let ordersFromCart = JSON.parse(cachedOrder);

                for(let start = 0 ; start < ordersFromCart.length ; start++)
                {
                    let order = ordersFromCart[start];
                    if (order.sellerId == payload.sellerId){
                        for(let start = 0 ; start < order.customers.length ; start++)
                        {
                            let customer = order.customers[start]
                            if (customer.id == payload.customers[0].id){

                                for(let start = 0 ; start < customer.items.length ; start++)
                                {
                                    let item = customer.items[start]
                                    if (item.product.id == payload.customers[0].items[0].product.id){
                                        // console.log('product found')
                                        // console.log(payload.customers[0].items[0].quantity);
                                        item.quantity = parseInt(item.quantity) + payload.customers[0].items[0].quantity*1;
                                        console.log(item);
                                        localStorage.removeItem('myCart');
                                        localStorage.setItem('myCart', JSON.stringify(ordersFromCart))
                                        dispatch('getFromCartStore', payload.sellerId)
                                        return 1;
                                    }
                                }
                                console.log("End of Item loop")
                                customer.items.push(payload.customers[0].items[0])
                                localStorage.removeItem('myCart');
                                localStorage.setItem('myCart', JSON.stringify(ordersFromCart))
                                dispatch('getFromCartStore', payload.sellerId)
                                return 1;
                            }

                        }
                        order.customers.push(payload.customers[0])
                        localStorage.removeItem('myCart');
                        localStorage.setItem('myCart', JSON.stringify(ordersFromCart))
                        dispatch('getFromCartStore', payload.sellerId)
                        return 1;
                    }
                }
                ordersFromCart.push(payload)
                localStorage.removeItem('myCart');
                localStorage.setItem('myCart', JSON.stringify(ordersFromCart))
                dispatch('getFromCartStore', payload.sellerId)
            }

            commit('setCacheIsEmpty', false)
            return 1;
        },

        /*  get Cache orders    */
        async getFromCartStore({ commit }, id){
            let cachedOrder = JSON.parse(localStorage.getItem('myCart'))
            if (!cachedOrder){
                commit('setCacheIsEmpty', true)
                commit('setCartInfos', []);
            }
            else{
                let localVar = []
                cachedOrder.forEach((order) => {
                    if (order.sellerId == id){
                        localVar.push(order)
                    }
                })
                commit('setCartInfos', localVar);
            }
        },

        /*  delete cache data    */
        async deleteCacheData({ dispatch }, payload) {
            let cachedOrderBefore = JSON.parse(localStorage.getItem('myCart'))
            let cachedOrder = cachedOrderBefore;
            cachedOrder.forEach((order) => {                                                //  looping cacheOrder
                if (order.sellerId == payload.sellerId) {                                   //  if seller matches
                    order.customers.forEach(customer => {                                   //  customer loops
                        if (customer.id == payload.customerId) {                            //  customer matches
                            for (let start = 0; start < customer.items.length; start++) {   //  order items loop
                                if (start == payload.cartIndex) {                           //  matching the index no of order item
                                    if (customer.items.length == 1) order.customers.pop()   //  if only one item remains remove customer.
                                    customer.items.splice(start, 1)                         //  adding item in the specific index.
                                }
                            }
                        }
                    })
                }
            })
            localStorage.removeItem('myCart');                          //  clearing local storage.
            localStorage.setItem('myCart', JSON.stringify(cachedOrder))     // Again Uploading newly created array to localstorage.
            dispatch('getFromCartStore', payload.sellerId)                  // dispatching action to update state.
            return 1;
        },

        /* updating cart store */
        async updateCartStore({ dispatch }, payload){
            console.log(payload)
            let cachedOrderBefore = JSON.parse(localStorage.getItem('myCart'))
            cachedOrderBefore.forEach((order) => {                                          //   looping cacheOrder
                if (order.sellerId == payload.sellerId) {
                    console.log('sm')//   if seller matches
                    order.customers.forEach(customer => {                                   //   customer loops
                        if (customer.id == payload.customers[0].id) {//   customer matches
                            for (let start = 0; start < customer.items.length; start++) {   //   order items loop
                                if (start == payload.itemIndex) {
                                    console.log(payload)
                                    console.log(customer.items[start])
                                    //   matching the index no of order item
                                    if (customer.items.length == 1) {                       //   if only one item remains remove customer.
                                        customer.items.pop()                                //   removing existing item from item list
                                        customer.items.push(payload.customers[0].items[0])  //  adding item in an empty array
                                    }
                                    customer.items.splice(start, 1, payload.customers[0].items[0])   //  adding item in the specific index.
                                }
                            }
                        return 1 ;
                        }
                        console.log(payload.customers[0].items[0])
                        return 1;
                    })
                }
            })
            localStorage.removeItem('myCart');                               //  clearing local storage.
            localStorage.setItem('myCart', JSON.stringify(cachedOrderBefore))    // Again Uploading newly created array to localstorage.
            dispatch('getFromCartStore', payload.sellerId)                       // dispatching action to update state.
            return 1;
        }

    }

}