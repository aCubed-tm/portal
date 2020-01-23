import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}

const routes = [
  {
    path: '/',
    name: 'account',
    component: lazyLoad('profile/show'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
