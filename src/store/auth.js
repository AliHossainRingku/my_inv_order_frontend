import api from './api.js'

export default {
	state: {
		nothing:'',
		user:[],
	},
	mutations: {
		setUser(state, data) {
			state.user = data;
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
							commit('setUserToLocalStorage', res);
							//console.log('res')
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
				api('post', `api/register`, data).then(res => {
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

		async user({ commit }) {
			let response = await api('get', `api/user`);
			if (response.success) {
				commit('setUser', response.data)
			}
		},
			
		
	},
	modules: {
	}
}