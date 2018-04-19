import Visa from './components/Visa';
import App from "./components/App";
const routes = [
  { path: '/', exact: true, name: 'Home', component: App },
  { path: '/visa', name: 'Visa', component: Visa },
];

export default routes;
