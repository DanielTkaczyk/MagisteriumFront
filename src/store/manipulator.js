import axios from '../axios';
// import router from "../../router";

const state = {
  data: null,
  histories_data: null,
  latest_data: null,
  add_success: null,
  add_errors: null,
  delete_success: null,
  delete_errors: null,
  start_manipulator_order_success: null,
  start_manipulator_order_error: null,
  end_manipulator_order_success: null,
  end_manipulator_order_error: null,
};

const mutations = {
  FETCH_SUCCESS(state, res) {
    state.data = res.data;
  },
  FETCH_HISTORIES_SUCCESS(state, res) {
    state.histories_data = res.data;
  },
  ADD_SUCCESS(state, res) {
    state.add_success = res.success;
    state.add_errors = res.error;
  },
  DELETE_SUCCESS(state, res) {
    state.delete_success = res.success;
    state.delete_errors = res.error;
  },
  START_MANIPULATOR_ORDER_SUCCESS(state, res) {
    state.start_manipulator_order_success = res.success;
    state.start_manipulator_order_data = res.data;
  },
  END_MANIPULATOR_ORDER_SUCCESS(state, res) {
    state.end_manipulator_order_success = res.success;
    state.end_manipulator_order_data = res.data;
  },
  FETCH_LATEST_ORDER_SUCCESS(state, res) {
    state.latest_data = res.data;
  },
};

const getToken = () => {
  return window.localStorage.getItem('token');
};

const actions = {
  async startManipulatorOrder({ commit, dispatch }, id) {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` },
    };

    const res = await axios.post(
      `ManipulatorApi/StartManipulatorOrder?manipulatorOrderId=${id}`,
      {},
      config,
    );
    if (res.data.success) {
      commit('START_MANIPULATOR_ORDER_SUCCESS', {
        success: true,
        data: res.data.description,
      });
      dispatch('fetchLatestManipulatorOrder');
    } else {
      commit('START_MANIPULATOR_ORDER_SUCCESS', {
        success: false,
        data: res.data.description,
      });
    }
  },
  async endManipulatorOrder({ commit, dispatch }, id) {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` },
    };

    const res = await axios.post(
      `ManipulatorApi/EndManipulatorOrder?manipulatorOrderHistoryId=${id}`,
      {},
      config,
    );
    if (res.data.success) {
      commit('END_MANIPULATOR_ORDER_SUCCESS', {
        success: true,
        data: res.data.description,
      });
      dispatch('fetchLatestManipulatorOrder');
    } else {
      commit('END_MANIPULATOR_ORDER_SUCCESS', {
        success: false,
        data: res.data.description,
      });
    }
  },
  async fetchManipulatorOrders({ commit }) {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` },
    };

    const res = await axios.get(
      'ManipulatorApi/GetManipulatorOrders',
      config,
    );
    commit('FETCH_SUCCESS', {
      data: res.data,
    });
  },
  async fetchLatestManipulatorOrder({ commit }) {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` },
    };

    const res = await axios.get(
      'ManipulatorApi/GetLatestManipulatorOrderHistory',
      config,
    );
    commit('FETCH_LATEST_ORDER_SUCCESS', {
      data: res.data.resultObject,
    });
  },
  async fetchManipulatorOrdersHistories({ commit }) {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` },
    };

    const res = await axios.get(
      'ManipulatorApi/GetManipulatorOrdersHistories',
      config,
    );
    commit('FETCH_HISTORIES_SUCCESS', {
      data: res.data,
    });
  },
  async deleteManipulatorOrder({ commit, dispatch }, id) {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` },
    };
    try {
      const res = await axios.delete(
        `ManipulatorApi/DeleteManipulatorOrder?manipulatorOrderId=${id}`,
        config,
      );
      if (res.data.success) {
        commit('DELETE_SUCCESS', {
          success: true,
          error: false,
        });
        dispatch('fetchManipulatorOrders');
      } else {
        throw Error(res.data.description);
      }
    } catch (err) {
      commit('DELETE_SUCCESS', {
        success: false,
        error: false,
      });
    }
  },
  async addManipulatorOrder({ commit, dispatch }, data) {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` },
    };
    try {
      const res = await axios.post(
        `ManipulatorApi/AddManipulatorOrder`,
        data,
        config,
      );
      console.log(res);
      if (res.data.success) {
        commit('ADD_SUCCESS', {
          success: true,
          error: false,
        });
        dispatch('fetchManipulatorOrders');
      } else {
        console.log(res);
        throw Error(res.data.description);
      }
    } catch (err) {
      console.log(err.response);
      commit('ADD_SUCCESS', {
        success: false,
        error: false,
      });
    }
  },
};

const getters = {
  getData: state => {
    return state.data;
  },
  getHistoriesData: state => {
    return state.histories_data;
  },
  getLatestData: state => {
    return state.latest_data;
  },
  getAddStatus: state => {
    return {
      success: state.add_success,
      error: state.add_error,
    };
  },
  getDeleteStatus: state => {
    return {
      success: state.delete_success,
      error: state.delete_error,
    };
  },
  getStartManipulatorStatus: state => {
    return {
      success: state.start_manipulator_order_success,
      data: state.start_manipulator_order_data,
    };
  },
  getEndManipulatorStatus: state => {
    return {
      success: state.end_manipulator_order_success,
      data: state.end_manipulator_order_data,
    };
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
