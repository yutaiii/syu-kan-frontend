import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import firebase from 'firebase';
import store from './store';

Vue.config.productionTip = false

const firebaseAuthConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN
}

firebase.initializeApp(firebaseAuthConfig);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
