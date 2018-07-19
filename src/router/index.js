import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    }
    ,{
      path: '/main',
      name: 'main',
      component: () => import('@/views/main')
    },
    {
      path: '/locking',
      name: 'locking',
      component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
    }
  ]
})
