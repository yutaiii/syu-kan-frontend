import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    userId: 0,
  },
  mutations: {
    onUserLoginStatusChanged(state, isLoggedIn) {
      // ログインしているかどうか
      state.isLoggedIn = isLoggedIn;
    },
    updateUserId(state, userId) {
      state.userId = userId;
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    userId(state) {
      return state.userId;
    }
  }
});