export const ROUTE = {
  HOME: '/',
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password/:token',
  REGISTER_BY_INVITE: '/auth/signup-by-invitation/:token',
  SCHEDULES: '/dashboard/schedules',
  SCHEDULE_VISITS: '/dashboard/schedules/:id',
  FINANCES: '/dashboard/finances',
  NOTES: '/dashboard/notes',
  CREATE_NOTE: '/dashboard/notes/create',
  NOTE: '/dashboard/notes/:id',
  EDIT_NOTE: '/dashboard/notes/:id/edit',
  SPRINTS: '/dashboard/sprints',
  SPRINT: '/dashboard/sprints/:id',
  BONUSES: '/dashboard/bonuses',
  ACTIVITIES: '/dashboard/activities',
  SETTINGS: '/dashboard/settings',
  ADMIN: '/dashboard/admin',
  ERROR: '/error',
};

export const DYNAMIC_ROUTE = {
  SCHEDULE: (id) => `${ROUTE.SCHEDULES}/${id}`,
  NOTE: (id) => `${ROUTE.NOTES}/${id}`,
  EDIT_NOTE: (id) => `${ROUTE.NOTES}/${id}/edit`,
  SPRINT: (id) => `${ROUTE.SPRINTS}/${id}`,
};
