import axios from '../axios';
import router from '../router';

const state = {
  token: window.localStorage.getItem('token'),
  isLogged: false,
  error: null,
};

const mutations = {
  LOGIN_SUCCESS(state, data) {
    state.isLogged = data.success;
    state.token = data.isLogged;
    state.error = data.error;
  },
};

const actions = {
  async login({ commit }, object) {
    try {
      const res = await axios.post('AccountApi/Login/Token', {
        password: object.password,
        name: object.name,
      });
      if (res.data.success) {
        window.localStorage.setItem('token', res.data.resultObject);
        commit('LOGIN_SUCCESS', {
          success: res.data.success,
          token: res.data.resultObject,
          error: null,
        });
        router.push('/home');
      } else {
        throw Error(res.data.description);
      }
    } catch (err) {
      commit('LOGIN_SUCCESS', {
        success: false,
        token: null,
        error: err.message,
      });
    }
  },
};

const getters = {
  getLoginData: state => {
    return state;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
