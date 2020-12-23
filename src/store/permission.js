import api from './api.js'

export default {
    state: {
        permissions: [],
        isFetchingPermission: false,
        permissionLoader: false
    },
    mutations: {
        setPermission(state, data) {
            state.permissions = data;
        },
        setFetchingState(state, value) {
            state.isFetchingPermission = value
        },
        setPermissionLoader(state, value) {
            state.permissionLoader = value
        }
    },
    actions: {
        async allPermission({ commit }) {
            commit('setFetchingState', true)
            let response = await api('get', `api/v1/admin/permissions`);
            commit('setFetchingState', false)
            if (response.success) {
                commit('setPermission', response.data)
            }
        },

        async updatePermission({ dispatch }, payload) {
            return new Promise((resolve, reject) => {
                api('post', `api/v1/admin/permissions/${payload.permissionId}`, payload.formData)
                    .then(res => {
                        if (res.success) {
                            dispatch('allPermission')
                            resolve({ success: true, message: res.message });
                        } else {
                            resolve({ success: false, message: res.message });
                            reject('');
                        }
                    })
            })
        },

        async createPermission({ dispatch }, formData) {
            return new Promise((resolve, reject) => {
                api('post', `api/v1/admin/permissions`, formData).then(res => {
                    if (res.success) {
                        dispatch('allPermission')
                        resolve({ success: true, message: res.message });
                    } else {
                        resolve({ success: false, message: res.message });
                        reject('');
                    }
                })
            })
        },

        async deletePermission({ commit, dispatch }, data) {
            commit('setFetchingState', true)
            return new Promise((resolve, reject) => {
                api('post', `api/v1/admin/permissions/${data.id}`, data).then(res => {
                    if (res.success) {
                        dispatch('allPermission')
                        commit('setFetchingState', false)
                        resolve({ success: true, message: res.message });
                    } else {
                        commit('setFetchingState', false)
                        resolve({ success: false, message: res.message });
                        reject('');
                    }
                })
            })
        }
    },
    modules: {
    }
}