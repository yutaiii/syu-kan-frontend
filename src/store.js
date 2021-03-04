import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

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
  },
  plugins: [createPersistedState(
    {
      // ストレージのキーを指定。デフォルトではvuex
      key: 'syu-kan-app',
      // 管理対象のステートを指定
      paths: [
        'isLoggedIn',
        'userId',
      ],
      // ストレージの種類を指定。デフォルトではローカルストレージ
      storage: window.localStrage,
    }
  )]
});