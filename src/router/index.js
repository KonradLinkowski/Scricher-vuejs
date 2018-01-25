import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '../components/MainPage';
import LoginPage from '../components/LoginPage';
import UserPage from '../components/UserPage'
import { requireAuth } from '../util/auth';

Vue.use(Router);

export default new Router({
  mode: 'hash',
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
    {
      path: '/:userid',
      name: 'UserPage',
      beforeEnter: requireAuth,
      component: UserPage,
    }
  ],
});