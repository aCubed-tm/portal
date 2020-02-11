function lazyLoad(view) {
  return () => import(`@/views/admin/${view}.vue`);
}

export default [
  {
    path: 'overview',
    name: 'admin.overview',
    component: lazyLoad('overview/Show'),
  },
  {
    path: 'statistics',
    name: 'admin.statistics',
    component: lazyLoad('statistics/Show'),
  },
  {
    path: 'users',
    name: 'admin.users',
    component: lazyLoad('users/Show'),
  },
  {
    path: 'organisations',
    name: 'admin.organisations',
    component: lazyLoad('organisations/Show'),
  },
  {
    path: 'cameras',
    name: 'admin.cameras',
    component: lazyLoad('cameras/Show'),
  },
];
