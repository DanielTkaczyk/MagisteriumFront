import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Error from '../views/Error.vue';
import ManipulatorOrder from '../views/ManipulatorOrder.vue';
import ManipulatorOrders from '../views/ManipulatorOrders.vue';
import History from '../views/History.vue';
import Info from '../views/Info.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/signin',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: ManipulatorOrder,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/manipulator-orders',
    name: 'ManipulatorOrders',
    component: ManipulatorOrders,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/info',
    name: 'Info',
    component: Info,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '*',
    component: Error,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = window.localStorage.getItem('token');
    if (token) {
      next();
    } else if (!token) {
      next({
        name: 'Login',
      });
    }
  } else {
    next();
  }
});

export default router;
