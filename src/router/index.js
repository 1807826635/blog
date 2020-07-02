import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/login'
import basketball from '@/components/basketball'
import footballSchedule from '@/components/footballSchedule'
import liveanime from '@/components/liveanime'
import basketballagenda from '@/components/basketballagenda'

Vue.use(Router)

export default new Router({
  routes: [{ // 足球赛事赛程
    path: '/',
    name: 'home',
    component: home,
    meta: {index: 1, title: '足球赛程'}
  },
  {
    path: '/basketball',
    name: 'basketball',
    component: basketball,
    meta: {index: 1, title: '篮球赛程'}
  }, { // 足球实时赛程
    path: '/football/schedule',
    name: 'footballSchedule',
    component: footballSchedule
  }, { // 足球动画
    path: '/liveanime',
    name: 'liveanime',
    component: liveanime
  },
  { // 篮球
    meta: {index: 1, title: '篮球比分'},
    path: '/basketballagenda',
    name: 'basketballagenda',
    component: basketballagenda
  }

  ]
})
