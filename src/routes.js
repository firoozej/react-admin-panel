const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/role', exact: true, name: 'Roles' },
  { path: '/role/create', name: 'New Role'},
  { path: '/role/edit/:id', name: 'Edit Role'},
  { path: '/permission', exact: true, name: 'Permissions' },
  { path: '/permission/create', name: 'New Permission'},
  { path: '/permission/edit/:id', name: 'Edit Permission'},
  { path: '/user', exact: true, name: 'Users' },
  { path: '/user/create', name: 'New User'},
  { path: '/user/edit/:id', name: 'Edit User'},
  { path: '/category', exact: true, name: 'Categories' },
  { path: '/category/create', name: 'New Category'},
  { path: '/category/edit/:id', name: 'Edit Category'},
  { path: '/item', exact: true, name: 'Items' },
  { path: '/item/create', name: 'New Item'},
  { path: '/item/edit/:id', name: 'Edit Item'},
  { path: '/notification', exact: true, name: 'Notifications' },
  { path: '/notification/create', name: 'New Notification'},
  { path: '/notification/edit/:id', name: 'Edit Notification'},
];

export default routes;
