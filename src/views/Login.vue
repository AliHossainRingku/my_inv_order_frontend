<template>

	<v-app id="inspire">
		<div class="i-wrapper d-flex justify-center align-center">
			<v-card
				class="mx-auto "
				max-width="344"
				min-width="300"
				outlined
			>
				<v-card-title class="headline">
					Log In
				</v-card-title>
				<!-- <v-card-text> -->
				<v-form 
					v-model="valid"
					ref="form"
				>
					<v-row class="px-3">
						<v-col cols="12">
							<label for="">Email</label>
							<v-text-field
								v-model="credential.email"
								:rules="emailRules"
								dense
								outlined
								placeholder="example@mail.com"
								required
							></v-text-field>
							<label for="">Passwrd</label>
							<v-text-field
								v-model="credential.password"
								:rules="passwordRules"
								dense
								type="password"
								outlined
								placeholder="Password"
								required
							></v-text-field>
						</v-col>
					</v-row>		
				</v-form>
				<!-- </v-card-text> -->
				<v-card-actions>
				<!-- <v-spacer></v-spacer> -->
				<v-btn
					color="green darken-1"
					text
					@click="onClickLogin"
					:loading="loading"
				>
					Log In
				</v-btn>
				<v-btn
					text
					to="/register"
				>
				Register
				</v-btn>
				</v-card-actions>
			</v-card>
		</div>
		<v-snackbar
			v-model="snackbar"
			:multi-line="multiLine"
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
	</v-app>

</template>

<script>
// import axios from 'axios'
import { mapActions } from 'vuex'
export default {
	name: 'LoginPage',
	data: () => ({
		valid: false,
		loading: false,
		snackbar: false,
		multiLine: true,
		text: '',
		credential: {
			email: '',
			password: ''
		},
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }),
    methods: {
		...mapActions([
			'userlogin'
		]),
		async onClickLogin(){
			this.$refs.form.validate()
			if(this.$refs.form.validate()){
				this.loading = true;
				let res = await this.userlogin(this.credential);
				if(res.success){
          console.log(res)
					this.$router.push('/')
				}else{
					this.loading = false
					this.snackbar = true;
					this.text = res.message;
				}
			}
		}
    }
}

</script>

<style lang="scss">
.i-wrapper {
  height: 100%;
}
</style>