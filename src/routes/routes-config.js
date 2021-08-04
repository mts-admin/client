import NoAuthLayout from '../layouts/no-auth-layout';
import LoginPage from '../pages/auth/login';
import ForgotPasswordPage from '../pages/auth/forgot-password';
import { ROUTE } from './constants';

const routesConfig = [
  {
    path: ROUTE.LOGIN,
    Component: LoginPage,
    Layout: NoAuthLayout,
    auth: false,
  },
  {
    path: ROUTE.FORGOT_PASSWORD,
    Component: ForgotPasswordPage,
    Layout: NoAuthLayout,
    auth: false,
  },
];

export default routesConfig;
