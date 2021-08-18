import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios';
import service from './service/interface.js'
import 'mavon-editor/dist/css/index.css'

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$http = axios;
Vue.prototype.INTERFACE = service['INTERFACE']
Vue.use(VueAxios,axios);
Vue.config.productionTip = false
var app  = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

console.log('app',app,store)