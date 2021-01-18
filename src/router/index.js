import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function loadComponent(componentName) {
  return () => import(`@/components/${componentName}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(`@/views/Home.vue`)
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(`@/views/About.vue`)
  },
  {
    path: '/daily-check',
    name: 'DailyCheck',
    component: loadComponent('DailyCheck')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
