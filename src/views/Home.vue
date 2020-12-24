<template>
	<div class="wrapper pt-16">
		<div class="container seller">
			<div class="d-flex justify-end">
				<v-btn
					text
					color="green"
					@click="logout"
				>
					Logout
				</v-btn>
			</div>
			<div  class="select-box  flex-column d-flex align-center justify-center">



				<template>
					<div
						style="border: 2px dashed gray"
						
						class="p-10 mb-10" 
					>
						<v-btn
							text
							@click="goToDashboard"
						>
							go to your account
						</v-btn>
					</div>
				</template>
				
			</div>


		<v-snackbar 
			v-model="snackbar" 
			:multi-line="true"
		>
			{{ text }}

			<template v-slot:action="{ attrs }">
				<v-btn 
					color="green" 
					text 
					v-bind="attrs" 
					@click="snackbar = false"
				>
				Close
				</v-btn>
			</template>
		</v-snackbar>
		</div>
	</div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";

export default {
	name: 'Home',
	components: {
		
	},

	data() {
		return {
			id: '',
			dialog: false,
			snackbar: false,
			text: '',
		}
	},
	computed: {
		
	},

	methods: {
		...mapActions([
			'user',
			'createSeller',
		]),
		...mapMutations([
			'setSellerInfo'
		]),

		goToDashboard() {
			//let seller = this.sellers.filter(i => i.id == this.id)
			//localStorage.setItem('seller_info', JSON.stringify(seller[0]));
			//this.setSellerInfo();
			this.$router.push('/dashboard');
		},

		closeCrateDialog() {
			this.dialog = false;
			this.$refs.createForm.resetValidation();
			this.$refs.createForm.emptyForm();
		},


		logout(){
			localStorage.removeItem('im_token');
			localStorage.removeItem('user');
			localStorage.removeItem('seller_info');
			this.$router.push('/login');
		}
	},

	mounted() {
		this.user();
    console.log(localStorage.getItem('im_token'))

	},

	watch:  {
		sellers() {
			this.id = this.sellers[0].id
		}
	}
}
</script>

<style lang="scss">
	.wrapper{
		background-color: #e2e5e2;
		height: 100%;
		position: relative;
		box-shadow: 4px 0px 4px rgba(202, 202, 202, 0.25);

		.seller {
			height: 100%;
			background: #fff;
			a {
				text-decoration: none;
			}
			.slect-box{
			height: 90%;
			}
		}
	}
</style>
