import Vue from 'vue';
import VueRouter from 'vue-router';

import profileChildren from '@/views/user/_routes';
import organisationChildren from '@/views/organisation/_routes';
import adminChildren from '@/views/admin/_routes';

Vue.use(VueRouter);

function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}

const authGuard = (to, from, next) => {
  next('/auth');
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: lazyLoad('user/Show'),
    beforeEnter: authGuard,
  },
  {
    path: '/auth',
    name: 'auth',
    component: lazyLoad('auth/Login'),
  },
  {
    path: '/auth/reset-password',
    name: 'passwordReset',
    component: lazyLoad('auth/PasswordReset'),
    // beforeEnter: authGuard
  },
  {
    path: '/user/',
    name: 'user',
    component: lazyLoad('user/Show'),
    redirect: '/user/profile',
    children: profileChildren,
    // beforeEnter: authGuard
  },
  {
    path: '/organisation/',
    name: 'organisation',
    component: lazyLoad('organisation/Show'),
    redirect: '/organisation/overview',
    children: organisationChildren,
    // beforeEnter: authGuard
  },
  {
    path: '/admin/',
    name: 'admin',
    component: lazyLoad('admin/Show'),
    redirect: '/admin/overview',
    children: adminChildren,
    // beforeEnter: authGuard
  },
  {
    path: '/map',
    name: 'map',
    component: lazyLoad('map/Show'),
  },
  {
    path: '*',
    name: 'error',
    component: lazyLoad('error/404'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
