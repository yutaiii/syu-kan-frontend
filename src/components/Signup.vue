<template>
  <v-card
    class="pa-5 ma-auto"
    width="50%"
  >
    <v-form
      ref="loginForm"
    >
      <v-text-field
        v-model="email"
        label="Email"
        :rules="requiredRule"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        label="Password"
        :rules="requiredRule"
        :type="showPassword ? 'text' : 'password'"
        required
        @click:append="showPassword = !showPassword"
      ></v-text-field>
      <v-btn
        @click="login"
      >
        ログイン
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Signup',
  data: () => ({
    email: "",
    password: "",
    requiredRule: [
      value => !!value || '必須項目です',
    ],
    showPassword: false,
  }),
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          alert('success')
          console.log('success', res)
        })
        .catch(e => {
          alert('error')
          console.log('error', e)
        })
      } else {
        console.log('validate error')
      }
    },
  }
}
</script>
