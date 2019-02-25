import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/less/index.less'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
