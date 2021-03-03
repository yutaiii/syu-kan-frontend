import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    isLoggedIn: false,
    userId: 0,
  },
  mutations: {
    onAuthStateChanged(state, user) {
      // firebaseが返したユーザー情報
      state.user = user;
    },
    onUserLoginStatusChanged(state, isLoggedIn) {
      // ログインしているかどうか
      state.isLoggedIn = isLoggedIn;
    },
    updateUserId(state, userId) {
      state.userId = userId;
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    userId(state) {
      return state.userId;
    }
  }
});