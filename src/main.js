import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios';
import mavonEditor from 'mavon-editor'
import service from './service/interface.js'
// import $ from 'jquery'
// import bootstrap from 'bootstrap'
import 'mavon-editor/dist/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$http = axios;
Vue.prototype.INTERFACE = service['INTERFACE']
Vue.use(VueAxios,axios);
Vue.use(mavonEditor)
Vue.config.productionTip = false
var app  = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

console.log('app',app)