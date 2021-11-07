import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.darkmoon.css';//此为组件主题样式，可修改dark、light、darkmoon等，详情见官方API

new Vue({
  render: h => h(App),
}).$mount('#app')
