<template>
  <v-app id="inspire">
    <div class="i-wrapper d-flex justify-center align-center">
      <v-card class="mx-auto" max-width="344" min-width="300" outlined>
        <v-card-title class="headline"> Register New Member </v-card-title>
        <!-- <v-card-text> -->
        <v-form
          ref="form" 
          v-model="valid"
        >
          <v-row class="px-3">
            <v-col cols="12">
              <label for="">Name</label>
              <v-text-field
                v-model="form.name"
                :rules="nameRules"
                dense
                outlined
                placeholder="Name"
                required
              ></v-text-field>
              <label for="">Phone No</label>
              <v-text-field
                v-model="form.phone"
                :rules="phoneRules"
                dense
                outlined
                placeholder="Phone Number"
                required
              ></v-text-field>
              <label for="">Email</label>
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                dense
                outlined
                placeholder="E-mail"
                required
              ></v-text-field>
              <label for="">Password</label>
              <v-text-field
                v-model="form.password"
                :rules="passwordRules"
                dense
                type="password"
                outlined
                placeholder="Password"
                required
              ></v-text-field>
              <label for="">Confirm Password</label>
              <v-text-field
                v-model="confirmPassword"
                :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                dense
                type="password"
                outlined
                placeholder="Re enter password"
                required
              ></v-text-field>
              <!-- <v-text-field
                v-model="confirmPassword"
                :rules="[confirmPasswordRules, passwordConfirmationRule]"
                type="password"
                required
              ></v-text-field> -->
            </v-col>
          </v-row>
        </v-form>
        <!-- </v-card-text> -->
        <v-card-actions>
          <!-- <v-spacer></v-spacer> -->
          <v-btn 
            @click="onClickRegister" 
            color="green darken-1" 
            text
            :loading="loading"
          >
            Register
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            to="/login"
            text
          >
            Log In
          </v-btn>
        </v-card-actions>
      </v-card>
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
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "RegisterPage",
  data: () => ({
    valid: false,
    loading: false,
    snackbar: '',
    text: '',
    form: {
      name: '',
      email: '',
      phone: '',
      password: '',
      status: 1
    },
    confirmPassword: '',
    phoneRules: [(v) => !!v || "Phone No is required."],
    passwordRules: [(v) => !!v || "Password is required."],
    confirmPasswordRules: [(v) => !!v || "Confirm Password is required."],
    nameRules: [
      (v) => !!v || "Name is required",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),
  computed: {
    passwordConfirmationRule() {
      if (this.form.password === this.confirmPassword) {
        return true;
      } else {
        return "Password must match";
      }
    },
  },
  methods: {
    ...mapActions([
      'register'
    ]),
    async onClickRegister() {
      if(this.$refs.form.validate()){
        this.loading = true;
        let res = await this.register(this.form);
        if(res.success) {
          this.loading = false;
          this.snackbar = true;
          this.text = res.message;
          this.clearForm();
        }else{
          this.loading = false
          this.snackbar = true;
          this.text = res.message;
        }
      }
    },

    clearForm(){
      this.form.name = this.form.email = this.form.phone = this.form.password = this.confirmPassword = '';
      this.$refs.form.reset();
    }
  },
};
</script>

<style lang="scss">
.i-wrapper {
  height: 100%;
}
</style>