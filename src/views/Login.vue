<template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="login"
    >
    <v-container>

      <v-row class="login-card">
        <v-col md="6" offset-md="4">
          <v-card class=" pa-7" max-width="500">
            <v-text-field
              v-model="email"
              label="Email"
              required
              solo
              prepend-inner-icon="mdi-account"
            ></v-text-field>

            <v-text-field
            prepend-inner-icon="mdi-lock"
            v-model="password"
            label="Password"
            :type="showText ? 'text' : 'password'"
            required
            @click:append="showPass = !showPass"
            solo
            ></v-text-field>
            <p v-if="incorrectAuth">Incorrect email and password combination</p>

            <v-btn
            color="success"
            class="mr-4"
            @click="login"
            >
            Login
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    </v-form>
</template>

<script>
import { mapActions } from "vuex"
  export default {
    data: () => ({
      valid: true,
      showPass: false,
      password: '',
      email: '',
      incorrectAuth: false,
      showText:false
    }),

    methods: {
      ...mapActions(['authenticate']),
      login () {
        let credentials = {
          email: this.email,
          password: this.password
        }
        this.authenticate(credentials)
        .then(() => {
          this.$router.push({name: "Home"})
        })
        .catch(err =>{
          console.log(err)
          this.incorrectAuth = true
        })
      },
    },
    created () {
        if(localStorage.getItem('access_token') !== null && 
          localStorage.getItem('refresh_token') !== null && 
          localStorage.getItem('is_authenticated') !== false) {
          this.$router.push({name: "Home"})
        }
    }
  }
</script>

<style scoped>
  .login-card {
    padding-top: 15%;
  }
</style>