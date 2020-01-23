import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**
 * Lazy-loads view components, but with better UX. A loading view
 * will be used if the component takes a while to load, falling
 * back to a timeout view in case the page fails to load. You can
 * use this component to lazy-load a route with:
 *
 * component: () => lazyLoadView(import('@views/my-view'))
 *
 * @param {AsyncView} The view component
 */
const lazyLoadView = (AsyncView) => {
  const AsyncHandler = () => ({
      component: AsyncView,
      delay: 400,
      timeout: 10000,
  });

  return Promise.resolve({
      functional: true,
      render(h, { data, children }) {
          return h(AsyncHandler, data, children);
      },
  });
};


const loadView = (view) => {
  const path = `@/views/${view}.vue`;
  return () => lazyLoadView(import(path));
};

const routes = [
  {
    path: '/',
    name: 'account',
    component: loadView('profile/show'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
