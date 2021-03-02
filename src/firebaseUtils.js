import firebase from 'firebase';
import store from './store';

export default {
  onAuthStateChanged() {
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user : {};
      store.commit('onAuthStateChanged', user);
      store.commit('onUserLoginStatusChanged', user.uid ? true : false);
    });
  }
}