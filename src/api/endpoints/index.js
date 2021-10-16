export const endpoints = {
  login: '/api/v1/auth/login',
  forgotPassword: '/api/v1/auth/forgot-password',
  resetPassword: (token) => `/api/v1/auth/reset-password/${token}`,
  register: (token) => `/api/v1/auth/signup-by-invitation/${token}`,
  getMe: '/api/v1/auth/me',
  schedules: '/api/v1/schedules',
  getSchedules: (type) => `/api/v1/schedules/${type}`,
  scheduleById: (id) => `/api/v1/schedules/${id}`,
};

export const noAuthEndpoints = [
  'login',
  'forgot-password',
  'reset-password',
  'signup-by-invitation',
];
