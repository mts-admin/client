import LoginPage from '../pages/auth/login';
import ForgotPasswordPage from '../pages/auth/forgot-password';
import ResetPasswordPage from '../pages/auth/reset-password';
import RegisterPage from '../pages/auth/register';
import SchedulesPage from '../pages/schedules';
import VisitsPage from '../pages/visits';
import FinancesPage from '../pages/finances';
import NotesPage from '../pages/notes/notes-page';
import CreateNotePage from '../pages/notes/create-note-page';
import EditNotePage from '../pages/notes/edit-note-page';
import ViewNotePage from '../pages/notes/view-note-page';
import SprintsPage from '../pages/sprints';
import TasksPage from '../pages/tasks';
import BonusesPage from '../pages/bonuses';
import ActivitiesPage from '../pages/activities';
import SettingsPage from '../pages/settings';
import AdminPanelPage from '../pages/admin-panel';
import { ROUTE } from './constants';
import { USER_ROLE } from '../constants/users';

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
  {
    auth: true,
    path: ROUTE.NOTES,
    component: NotesPage,
  },
  {
    auth: true,
    path: ROUTE.CREATE_NOTE,
    component: CreateNotePage,
  },
  {
    auth: true,
    path: ROUTE.EDIT_NOTE,
    component: EditNotePage,
  },
  {
    auth: true,
    path: ROUTE.NOTE,
    component: ViewNotePage,
  },
  {
    auth: true,
    path: ROUTE.SPRINTS,
    component: SprintsPage,
  },
  {
    auth: true,
    path: ROUTE.SPRINT,
    component: TasksPage,
  },
  {
    auth: true,
    path: ROUTE.BONUSES,
    component: BonusesPage,
  },
  {
    auth: true,
    path: ROUTE.ACTIVITIES,
    component: ActivitiesPage,
  },
  {
    auth: true,
    path: ROUTE.SETTINGS,
    component: SettingsPage,
  },
  {
    auth: true,
    path: ROUTE.ADMIN,
    component: AdminPanelPage,
    allowedRoles: [USER_ROLE.ADMIN, USER_ROLE.OWNER],
  },
];

export default routesConfig;
