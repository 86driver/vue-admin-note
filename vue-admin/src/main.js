import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/index.less'
import echarts from 'echarts'
import iview from 'iview'
import Layout from 'components/Layout'

Vue.component('my-layout', Layout)
Vue.use(iview, {
  transfer: true
})

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
