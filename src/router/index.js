import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/login'
import basketball from '@/components/basketball'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/basketball',
    name: 'basketball',
    component: basketball
  }
  ]
})
