const endpoints = {
  login: '/api/v1/auth/login',
  getMe: '/api/v1/auth/me',
  forgotPassword: '/api/v1/auth/forgot-password',
  resetPassword: (token) => `/api/v1/auth/reset-password/${token}`,
  invite: (token) => `/api/v1/auth/signup-by-invitation/${token}`,
  schedules: '/api/v1/schedules',
  getSchedules: (type) => `/api/v1/schedules/${type}`,
  scheduleById: (id) => `/api/v1/schedules/${id}`,
};

export default endpoints;
