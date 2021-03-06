<template>
  <div>
    <h1>サインアップ</h1>
    <v-card
      class="pa-5 ma-auto mt-3"
      width="50%"
    >
      <v-form
        ref="loginForm"
        @submit.prevent="signupHandler"
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
          class="submitButton"
          color="orange lighten-2"
          type="submit"
          :disabled="isSubmitButtonDisabled"
          :loading="isSubmitButtonLoading"
        >
          登録
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import firebaseUtils from './../firebaseUtils';
import router from '@/router';

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
      isSubmitButtonDisabled: false,
      isSubmitButtonLoading: false,
    }
  },
  methods: {
    signupHandler() {
      // ボタンが押されるまでバリデーションを走らせないための対応
      this.emailRule = [
        v => !!v || '必須項目です',
        (v) => /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,})+$/.test(v) || 'メールアドレスが不正です'
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
      setTimeout(() => {
        if (this.$refs.loginForm.validate()){
          // ローディングを開始
          this.isSubmitButtonDisabled = true;
          this.isSubmitButtonLoading = true;

          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            let user = firebase.auth().currentUser;
            if (user) {
              let requestParam = {
                "name": this.accountName,
                "firebaseUid": user.uid
              };
              // DBにユーザーを登録
              axios.post('http://localhost:8000/user/create', requestParam)
              .then(() => {
                firebaseUtils.onAuthStateChanged();
                // トップ画面に遷移
                router.push({ path: '/' });
              })
              .catch(() => {
                alert('ユーザーの作成に失敗しました');
                this.isSubmitButtonDisabled = false;
                this.isSubmitButtonLoading = false;
              });
            } else {
              alert('ユーザーの作成に失敗しました');
              this.isSubmitButtonDisabled = false;
              this.isSubmitButtonLoading = false;
            }
          })
          .catch(() => {
            alert('ユーザーの作成に失敗しました');
            this.isSubmitButtonDisabled = false;
            this.isSubmitButtonLoading = false;
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.submitButton {
  color: white;
}
</style>
