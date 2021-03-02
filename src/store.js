import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    isLoggedIn: false,
  },
  mutations: {
    onAuthStateChanged(state, user) {
      // firebaseが返したユーザー情報
      state.user = user;
    },
    onUserLoginStatusChanged(state, isLoggedIn) {
      // ログインしているかどうか
      state.isLoggedIn = isLoggedIn;
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    }
  }
});