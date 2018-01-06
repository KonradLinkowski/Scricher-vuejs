import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '../components/MainPage';
import LoginPage from '../components/LoginPage';
import { requireAuth } from '../util/auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      beforeEnter: requireAuth,
      component: MainPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
  ],
});