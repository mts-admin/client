const endpoints = {
  login: '/api/v1/auth/login',
  getMe: '/api/v1/auth/me',
  forgotPassword: '/api/v1/auth/forgotPassword',
  resetPassword: (token) => `/api/v1/auth/resetPassword/${token}`,
};

export default endpoints;
