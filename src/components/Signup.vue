<template>
  <v-card
    class="pa-5 ma-auto"
    width="50%"
  >
    <v-form
      ref="loginForm"
      @submit.prevent="submitHandler"
    >
      <v-text-field
        v-model="email"
        label="Email Address"
        :rules="emailRule"
        required
      ></v-text-field>
      <v-text-field
        v-model="accountName"
        label="Account Name"
        :rules="accountNameRule"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        label="Password"
        :rules="passwordRule"
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
        type="submit"
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
  data() {
    return {
      email: "",
      accountName: "",
      password: "",
      confirmPassword: "",
      emailRule: [],
      accountNameRule: [],
      passwordRule: [],
      confirmPasswordRule: [],
      showPassword: false,
      showConfirmPassword: false,
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
    submitHandler() {
      // ボタンが押されるまでバリデーションを走らせないための対応
      this.emailRule = [
        v => !!v || '必須項目です',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(v) || 'メールアドレスが不正です'
      ];
      this.accountNameRule = [
        v => !!v || '必須項目です',
      ];
      this.passwordRule = [
        v => !!v || '必須項目です',
        v => v.length >= 6 || 'パスワードは6文字以上にしてください'
      ];
      this.confirmPasswordRule = [
        () => (this.password === this.confirmPassword) || '入力されたパスワードが異なります',
        v => !!v || '必須項目です',
        v => v.length >= 6 || 'パスワードは6文字以上にしてください'
      ];

      // signup処理
      let self = this;
      setTimeout(function() {
        if (self.$refs.loginForm.validate()){
          alert('submitted')
        } else  {
          alert('else')
        }
      })
    }
  }
}
</script>
