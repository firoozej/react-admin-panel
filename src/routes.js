import App from './components/App';
import RoleList from './components/Role/List';
import RoleCreate from './components/Role/Create';
import RoleEdit from './components/Role/Edit';
import Login from "./components/Login/Login";
import RequireAuth from "./components/withAuth";

const routes = [
  { path: '/', exact: true, name: 'Home', component: RequireAuth(App) },
  { path: '/login', name: 'Login', component: Login },
  { path: '/role', exact: true, name: 'Role', component: RoleList },
  { path: '/role/create', name: 'New Role', component: RoleCreate },
  { path: '/role/edit/:id', name: 'Edit Role', component: RoleEdit },
];

export default routes;
