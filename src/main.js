import Vue from 'vue'
import router from './router'
import App from './App.vue'
import axios from 'axios'
Vue.prototype.$api = function (path, fun, params) {
  axios.get('https://swapi.co/api' + path, {params: params}).then(fun)
}
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
