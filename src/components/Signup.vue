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
      <v-text-field
        v-model="confirmPassword"
        :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
        label="Confirm Password"
        :rules="confirmPasswordRule"
        :type="showConfirmPassword ? 'text' : 'password'"
        required
        @click:append="showConfirmPassword = !showConfirmPassword"
      ></v-text-field>
      <v-btn
        color="orange lighten-2"
        dark
        @click="signin"
      >
        登録
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
    confirmPassword: "",
    requiredRule: [
      value => !!value || '必須項目です',
    ],
    showPassword: false,
    showConfirmPassword: false,
  }),
  computed: {
    confirmPasswordRule() {
      return [
        () => (this.password === this.confirmPassword) || '入力されたパスワードが異なります',
        v => !!v || '必須項目です',
        v => v.length > 6 || 'パスワードは6文字以上にしてください'
      ];
    }
  },
  methods: {
    signin() {
      if (this.$refs.loginForm.validate()) {
        console.log('success')
      } else {
        console.log('validate error')
      }
    },
  }
}
</script>
