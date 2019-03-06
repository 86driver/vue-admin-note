import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/index.less'
import echarts from 'echarts'
import iview from 'iview'
import storage from 'good-storage'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor) // 富文本编辑器
Vue.use(iview, {
  transfer: true
})

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts // echarts插件
Vue.prototype.$storage = storage // localStorage插件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
