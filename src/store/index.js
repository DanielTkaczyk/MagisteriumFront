import Vue from 'vue';
import Vuex from 'vuex';
import login from './login';
import manipulator from './manipulator';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    manipulator,
  },
  // plugins: [createPersistedState()],
});
