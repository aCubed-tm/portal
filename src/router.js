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
    path: '/map/search',
    name: 'map/search',
    component: lazyLoad('map/partials/Search'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
