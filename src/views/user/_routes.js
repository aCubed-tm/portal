function lazyLoad(view) {
  return () => import(`@/views/user/${view}.vue`);
}

export default [
  {
    path: 'profile',
    name: 'user.profile',
    component: lazyLoad('profile/Show'),
  },
  {
    path: 'organisations',
    name: 'user.organisations',
    component: lazyLoad('organisations/Show'),
  },
  {
    path: 'security',
    name: 'user.security',
    component: lazyLoad('security/Show'),
  },
];
