import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '../components/MainPage';
import LoginPage from '../components/LoginPage';
//import { requireAuth } from '../utils/auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      //beforeEnter: requireAuth,
      component: LoginPage,
    },
  ],
});