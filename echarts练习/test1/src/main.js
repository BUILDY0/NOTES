import Vue from 'vue'
import * as echarts  from 'echarts'
import App from './App.vue'
Vue.prototype.$echarts = echarts;
new Vue({
  render: h => h(App),
}).$mount('#app')
