export const endpoints = {
  auth: {
    login: '/api/v1/auth/login',
    forgotPassword: '/api/v1/auth/forgot-password',
    resetPassword: (token) => `/api/v1/auth/reset-password/${token}`,
    register: (token) => `/api/v1/auth/signup-by-invitation/${token}`,
    getMe: '/api/v1/auth/me',
  },
  schedules: {
    schedules: '/api/v1/schedules',
    getSchedules: (type) => `/api/v1/schedules/${type}`,
    scheduleById: (id) => `/api/v1/schedules/${id}`,
    leaveSchedule: (id) => `/api/v1/schedules/${id}/leave`,
    scheduleParticipants: (id) => `/api/v1/schedules/${id}/participants`,
    scheduleVisits: (id) => `/api/v1/schedules/${id}/visits`,
    scheduleOneOffVisit: (id) => `/api/v1/schedules/${id}/visits/one-off`,
    scheduleRecurringVisits: (id) => `/api/v1/schedules/${id}/visits/recurring`,
  },
};

export const noAuthEndpoints = [
  'login',
  'forgot-password',
  'reset-password',
  'signup-by-invitation',
];
