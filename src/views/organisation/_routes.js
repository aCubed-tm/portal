function lazyLoad(view) {
  return () => import(`@/views/organisation/${view}.vue`);
}

export default [
  {
    path: 'overview',
    name: 'organisation.profile',
    component: lazyLoad('overview/Show'),
  },
  {
    path: 'members',
    name: 'organisation.organisations',
    component: lazyLoad('members/Show'),
  },
  {
    path: 'traceables',
    name: 'organisation.traceables',
    component: lazyLoad('traceables/Show'),
  },
  {
    path: 'info',
    name: 'organisation.info',
    component: lazyLoad('info/Show'),
  },
];
