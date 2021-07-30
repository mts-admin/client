import NoAuthLayout from '../layouts/no-auth-layout';
import LoginPage from '../pages/auth/login/login-page';
import { ROUTE } from './constants';

const routesConfig = [
  {
    path: ROUTE.LOGIN,
    Component: LoginPage,
    Layout: NoAuthLayout,
    auth: false,
  },
];

export default routesConfig;
