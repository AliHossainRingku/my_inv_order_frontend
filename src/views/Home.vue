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

				<template v-if="sellers.length > 0">
					<div class="d-flex align-center justify-center mb-5">
						<h3 class="mb-0">Select Seller Account</h3>
					</div>
					<div class="d-flex align-center justify-center">
						<v-select
							class="mr-2"
							:items="sellers"
							v-model="id"
							filled
							item-text="name"
							item-value="id"
							outlined
							dense
							placeholder="Select Seller"
						></v-select>

						<v-btn
							style="padding: 20px 10px !important; color: #fff;"
							class="mb-7"
							depressed
							color="green"
							@click="goToSeller"
						>
						Enter Store
						</v-btn>
					</div>
				</template>

				<template v-else>
					<v-progress-linear
						v-if="$store.state.seller.sellerloader"
						style="width: 500px;"
						indeterminate
						color="teal"
					></v-progress-linear>
					<div
						style="border: 2px dashed gray"
						v-else
						class="p-10 mb-10" 
					>
						<v-btn
							text
							@click="dialog = true"
						>
							create your first seller account
						</v-btn>
					</div>
				</template>
				
			</div>

		<!-- create dialog -->
		<v-dialog 
			v-model="dialog"
			width="500"
		>
		<v-card>
			<v-card-title 
			class="headline ml-n3" 
			style="background: #f2f2f2"
			>
			Add Seller
			</v-card-title>

			<CreateForm
				ref="createForm"
				@onCreate="storeSeller"
			>
				<template v-slot:closeBtn>
					<v-btn 
						color="gray darken-1" 
						text
						@click="closeCrateDialog"
					>
					Close
					</v-btn>
				</template>
			</CreateForm>
		</v-card>
		</v-dialog>
		<!-- create dialog -->

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
import CreateForm from "@/components/molecule/seller/Create";

export default {
	name: 'Home',
	components: {
		CreateForm
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
		sellers() {
			return this.$store.state.seller.sellers;
		},
	},

	methods: {
		...mapActions([
			'allSeller',
			'createSeller',
		]),
		...mapMutations([
			'setSellerInfo'
		]),

		goToSeller() {
			let seller = this.sellers.filter(i => i.id == this.id)
			localStorage.setItem('seller_info', JSON.stringify(seller[0]));
			this.setSellerInfo();
			this.$router.push(`/sellers/${this.id}`);
		},

		closeCrateDialog() {
			this.dialog = false;
			this.$refs.createForm.resetValidation();
			this.$refs.createForm.emptyForm();
		},

		async storeSeller(data){
			let res = await this.createSeller(data);
			if (res.success) {
				this.snackbar = true;
				this.text = res.message;
				this.closeCrateDialog();
				this.$refs.createForm.loadingHandle(false);
			} else {
				this.snackbar = true;
				this.text = res.message;
				this.$refs.createForm.loadingHandle(false);
			}
		},

		logout(){
			localStorage.removeItem('im_token');
			localStorage.removeItem('user');
			localStorage.removeItem('seller_info');
			this.$router.push('/login');
		}
	},

	mounted() {
		this.allSeller();
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
