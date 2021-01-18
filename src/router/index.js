import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function loadView(componentName) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${componentName}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadView('Home')
  },
  {
    path: '/about',
    name: 'About',
    component: loadView('About')
  },
  {
    path: '/daily-check',
    name: 'DailyCheck',
    component: loadView('DailyCheck')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
