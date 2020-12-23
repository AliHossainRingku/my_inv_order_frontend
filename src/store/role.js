import api from './api.js'

export default {
    state: {
        roles: [],
        isFetchingRole: false,
        roleLoader: false
    },
    mutations: {
        setRole(state, data) {
            state.roles = data;
        },
        setFetchingState(state, value) {
            state.isFetchingRole = value
        },
        setRoleLoader(state, value) {
            state.roleLoader = value
        }
    },
    actions: {
        async allRole({ commit }) {
            commit('setFetchingState', true)
            let response = await api('get', `api/v1/admin/roles`);
            commit('setFetchingState', false)
            if (response.success) {
                commit('setRole', response.data)
            }
        },

        async updateRole({ dispatch }, payload) {
            return new Promise((resolve, reject) => {
                api('post', `api/v1/admin/roles/${payload.roleId}`, payload.formData)
                    .then(res => {
                        if (res.success) {
                            dispatch('allRole')
                            resolve({ success: true, message: res.message });
                        } else {
                            resolve({ success: false, message: res.message });
                            reject('');
                        }
                    })
            })
        },

        async createRole({ dispatch }, formData) {
            return new Promise((resolve, reject) => {
                api('post', `api/v1/admin/roles`, formData).then(res => {
                    if (res.success) {
                        dispatch('allRole')
                        resolve({ success: true, message: res.message });
                    } else {
                        resolve({ success: false, message: res.message });
                        reject('');
                    }
                })
            })
        },

        async assignRole({ dispatch }, data) {
            return new Promise((resolve, reject) => {
                api('post', `api/v1/admin/roles/${data.roleId}/assign`, data.formData).then(res => {
                    if (res.success) {
                        dispatch('');
                        resolve({ success: true, message: res.message });
                    } else {
                        resolve({ success: false, message: res.message });
                        reject('');
                    }
                })
            })
        },

        async deleteRole({ commit, dispatch }, data) {
            commit('setFetchingState', true)
            return new Promise((resolve, reject) => {
                api('post', `api/v1/admin/roles/${data.id}`, data).then(res => {
                    if (res.success) {
                        dispatch('allRole')
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