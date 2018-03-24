// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Layout from './components/layout'
import axios from 'axios'
Vue.prototype.$ajax = axios
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import store from './store'
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'EN',
  messages: {
    "EN": require('./language/EN.js'),
    "zh-CN": require('./language/zh_CN.js')
  }
})
//i18n.locale = "zh"//更换locale的值

//Vue.http.options.emulateJSON = true;
//Vue.http.options.headers = {
//'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//};

//全局共用函数
Vue.prototype.routerPush = function (path) {
  router.push(path)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  template: '<Layout/>',
  components: {
    Layout
  }
})
