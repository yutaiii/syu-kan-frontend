<template>
  <div>
    <h1>ログイン</h1>
    <v-card
      class="pa-5 ma-auto mt-3"
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

    <!-- <div class="mt-5">
      <router-link to="/signup">アカウントを作成</router-link>
    </div> -->
  </div>
</template>

<script>
import firebase from 'firebase';
import firebaseUtils from './../firebaseUtils';
import router from '@/router'

export default {
  name: 'Login',
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
      // バリデーションが通ったらログインを行う
      if (this.$refs.loginForm.validate()) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          firebaseUtils.onAuthStateChanged();
          // ホーム画面に遷移
          router.push({ path: '/' });
        })
        .catch(() => {
          alert('ログインに失敗しました');
        })
      }
    },
  }
}
</script>