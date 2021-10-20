import LoginPage from '../pages/auth/login';
import ForgotPasswordPage from '../pages/auth/forgot-password';
import ResetPasswordPage from '../pages/auth/reset-password';
import RegisterPage from '../pages/auth/register';
import SchedulesPage from '../pages/schedules';
import { ROUTE } from './constants';

const routesConfig = [
  {
    auth: false,
    path: ROUTE.LOGIN,
    component: LoginPage,
  },
  {
    auth: false,
    path: ROUTE.FORGOT_PASSWORD,
    component: ForgotPasswordPage,
  },
  {
    auth: false,
    path: ROUTE.RESET_PASSWORD,
    component: ResetPasswordPage,
  },
  {
    auth: false,
    path: ROUTE.REGISTER_BY_INVITE,
    component: RegisterPage,
  },
  {
    auth: true,
    path: ROUTE.SCHEDULES,
    component: SchedulesPage,
  },
];

export default routesConfig;
