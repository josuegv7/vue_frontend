import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueCookies from 'vue-cookies';
import axios from 'axios';
import VCalendar from 'v-calendar';

Vue.use(axios);
Vue.use(VueCookies);
Vue.use(BootstrapVue);
Vue.use(VCalendar, {
  componentPrefix: 'vc'
});
Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')



