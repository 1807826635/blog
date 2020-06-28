import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/login'
import basketball from '@/components/basketball'
import title from '@/components/title'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/basketball',
      name: 'basketball',
      component: basketball
    },
    {
      path: '/title',
      name: 'title',
      component: title
    }
  ]
})
