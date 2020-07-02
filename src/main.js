// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Button, Field, Col, Row } from 'vant'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.prototype.HOST = '/api'

axios.defaults.headers.post['Content-type'] = 'application/json'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(Button).use(Field).use(Col).use(Row)
Vue.use(VueAxios, axios)
/* eslint-disable no-new */

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
