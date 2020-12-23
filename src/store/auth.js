import api from './api.js'

export default {
	state: {
		nothing:'',
		users:[],
	},
	mutations: {
		setUser(state, data) {
			state.users = data;
		},
		setUserToLocalStorage(state, data){
			state.nothing = '';
			let token = 'Bearer ' + data.access_token
			localStorage.setItem('im_token', token)
			localStorage.setItem('user', JSON.stringify(data.user) )
		}
	},
	actions: {
		async userlogin ({commit}, payload) {
			return new Promise((resolve, reject) => {

				api('get','/sanctum/csrf-cookie').then(response => {
					// Login...

					console.log(response)
					api('post', 'api/login', payload).then(res => {
						console.log(res)
						if(res.success){
							commit('setUserToLocalStorage', res.data);
							console.log('res')
							resolve({
								success: true,
								message: res.message
							})
						}else{
							resolve({
								success: false,
								message: res.message
							});
							reject()
						}
					})
				});
					
				})
			},


			async register ( {commit}, data) {
			return new Promise ((resolve, reject) => {
				api('post', `api/v1/auth/register`, data).then(res => {
					if(res.success) {
						commit('setCagegoryLoader', false)
						resolve({success: true, message: 'Registration Done. Now login '});
					}else{
						commit('setCagegoryLoader', false)
						resolve({success: false, message: res.message});
						reject('');
					}
				})
			})
		},

		async allUser({ commit }) {
			let response = await api('get', `api/v1/admin/users`);
			if (response.success) {
				commit('setUser', response.data)
			}
		},
			
		
	},
	modules: {
	}
}