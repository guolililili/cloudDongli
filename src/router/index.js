import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },{
      path: '/home',
      name: 'home',
      component: () => import('@/views/home')
    }
  ]
})
