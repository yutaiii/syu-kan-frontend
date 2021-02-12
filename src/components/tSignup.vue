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
        label="Email Address"
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
        :rules="requiredRule"
        :type="showConfirmPassword ? 'text' : 'password'"
        required
        @click:append="showConfirmPassword = !showConfirmPassword"
      ></v-text-field>
      <v-btn
        color="orange lighten-2"
        dark
        @click="signup()"
      >
        登録
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'tSignup',
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      requiredRule: [
        v => !!v || '必須項目です',
      ],
      showPassword: false,
      showConfirmPassword: false,
    }
  },
  methods: {
    signup() {
      // バリデーションチェック
      if (!this.$refs.loginForm.validate()) {
        alert('validation error');
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        alert('create user success')
      })
      .catch(() => {
        alert('create user error')
      });
    },
  }
}
</script>
