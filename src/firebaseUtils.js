import firebase from 'firebase';
import store from './store';
import axios from 'axios';

export default {
  onAuthStateChanged() {
    firebase.auth().onAuthStateChanged(u => {
      let user = u ? u : {};
      let isLoggedIn = user.uid ? true : false;
      store.commit('onUserLoginStatusChanged', isLoggedIn);

      if (!isLoggedIn) {
        // ログアウト時には0で更新する
        store.commit('updateUserId', 0);
        return;
      }

      // ユーザーIDの格納
      let currentUser = firebase.auth().currentUser;
      let requestParam = {
        "firebaseUid": currentUser.uid
      };

      // UidからユーザーIDを取得
      axios.post('http://localhost:8000/users/find', requestParam)
      .then(res => {
        store.commit('updateUserId', res.data.id);
      })
      .catch(() => {
        alert('エラーが発生しました');
      });
    });
  }
}