import NoAuthLayout from '../layouts/no-auth-layout';
import AuthLayout from '../layouts/auth-layout';
import LoginPage from '../pages/auth/login';
import ForgotPasswordPage from '../pages/auth/forgot-password';
import ResetPasswordPage from '../pages/auth/reset-password';
import RegisterPage from '../pages/auth/register';
import SchedulesPage from '../pages/schedules';
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
  {
    path: ROUTE.RESET_PASSWORD,
    Component: ResetPasswordPage,
    Layout: NoAuthLayout,
    auth: false,
  },
  {
    path: ROUTE.REGISTER_BY_INVITE,
    Component: RegisterPage,
    Layout: NoAuthLayout,
    auth: false,
  },
  {
    path: ROUTE.SCHEDULES,
    Component: SchedulesPage,
    Layout: AuthLayout,
    auth: true,
  },
];

export default routesConfig;
