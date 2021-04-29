import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
// import $ from 'jquery'
// import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import store from './store'

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$http = axios;
Vue.use(VueAxios,axios);
Vue.config.productionTip = false
new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app')
