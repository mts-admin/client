export const ROUTE = {
  HOME: '/',
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password/:token',
  REGISTER_BY_INVITE: '/auth/signup-by-invitation/:token',
  SCHEDULES: '/dashboard/schedules',
  FINANCES: '/dashboard/finances',
  NOTES: '/dashboard/notes',
  TASKS: '/dashboard/tasks',
  BONUSES: '/dashboard/bonuses',
  ACTIVITIES: '/dashboard/activities',
  SETTINGS: '/dashboard/settings',
  ERROR: '/error',
};

export const DYNAMIC_ROUTE = {
  SCHEDULE: (id) => `${ROUTE.SCHEDULES}/${id}`,
};
