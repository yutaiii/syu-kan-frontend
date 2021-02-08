<template>
  <div>
    <div class="logout">ログアウトしますか？</div>
    <v-btn
      class="ma-3"
      color="gray"
      @click="$router.go(-1)"
    >戻る</v-btn>
    <v-btn
      color="grey lighten-1"
      dark
      @click="logout()"
    >ログアウト</v-btn>
  </div>
</template>

<script>
import firebase from 'firebase';
import router from '@/router';

export default {
  name: 'Logout',
  methods: {
    logout() {
      firebase.auth().signOut()
      .then(() => {
        // ログイン画面に遷移
        router.push({ path: '/login' });
      })
      .catch(() => {
        alert('ログアウト失敗')
      });
    }
  },
}
</script>

<style scoped>
.logout {
  font-size: 40px;
  font-weight: bold;
}
</style>
