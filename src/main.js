import Vue from 'vue';
import App from './layouts/App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
Vue.config.productionTip = false;
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
