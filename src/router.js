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
    component: lazyLoad('profile/show'),
    beforeEnter: authGuard,
  },
  {
    path: '/auth',
    name: 'auth',
    component: lazyLoad('auth/login'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
