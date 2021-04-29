import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase';

Vue.use(VueRouter)

function loadComponent(componentName) {
  return () => import(`@/components/${componentName}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadComponent('Home'),
    meta: { requiresAuth: true },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: loadComponent('Signup')
  },
  {
    path: '/login',
    name: 'Login',
    component: loadComponent('Login')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: loadComponent('Logout'),
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(`@/views/About.vue`),
    meta: { requiresAuth: true },
  },
  {
    path: '/routine-check',
    name: 'RoutineCheck',
    component: loadComponent('RoutineCheck'),
    meta: { requiresAuth: true },
  },
  {
    path: '/routine-add',
    name: 'RoutineAdd',
    component: loadComponent('RoutineAdd'),
    meta: { requiresAuth: true },
  },
  {
    path: '/routine-edit',
    name: 'RoutineEdit',
    component: loadComponent('RoutineEdit'),
    meta: { requiresAuth: true },
  },
  {
    path: '/routine-delete',
    name: 'RoutineDelete',
    component: loadComponent('RoutineDelete'),
    meta: { requiresAuth: true },
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 認証状態をチェック
router.beforeEach((to, from, next) =>{
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    // 認証状態を取得
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next();
      } else {
        // 認証されていない場合
        next({ name: 'Login' });
      }
    })
  } else {
    next();
  }
});

export default router
