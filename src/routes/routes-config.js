import LoginPage from '../pages/auth/login';
import ForgotPasswordPage from '../pages/auth/forgot-password';
import ResetPasswordPage from '../pages/auth/reset-password';
import RegisterPage from '../pages/auth/register';
import SchedulesPage from '../pages/schedules';
import VisitsPage from '../pages/visits';
import FinancesPage from '../pages/finances';
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
  {
    auth: true,
    path: ROUTE.SCHEDULE_VISITS,
    component: VisitsPage,
  },
  {
    auth: true,
    path: ROUTE.FINANCES,
    component: FinancesPage,
  },
];

export default routesConfig;
