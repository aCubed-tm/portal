import Vue from 'vue';
import VueRouter from 'vue-router';

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
    name: 'profile',
    component: lazyLoad('profile/Show'),
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
    path: '/profile/',
    name: 'myProfile',
    component: lazyLoad('profile/Show'),
    // beforeEnter: authGuard
  },
  {
    path: '/map',
    name: 'map',
    component: lazyLoad('map/Show'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
