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
    schedulesByType: (type) => `/api/v1/schedules/${type}`,
    scheduleById: (id) => `/api/v1/schedules/${id}`,
    leaveSchedule: (id) => `/api/v1/schedules/${id}/leave`,
    scheduleParticipants: (id) => `/api/v1/schedules/${id}/participants`,
    scheduleVisits: (id) => `/api/v1/schedules/${id}/visits`,
    scheduleOneOffVisit: (id) => `/api/v1/schedules/${id}/visits/one-off`,
    scheduleRecurringVisits: (id) => `/api/v1/schedules/${id}/visits/recurring`,
    scheduleVisitById: (scheduleId, visitId) =>
      `/api/v1/schedules/${scheduleId}/visits/${visitId}`,
    scheduleVisitsGroup: (scheduleId, visitId) =>
      `/api/v1/schedules/${scheduleId}/visits/${visitId}/group`,
  },
  finances: {
    finances: '/api/v1/finances',
    financeById: (id) => `/api/v1/finances/${id}`,
    financesFullStatistics: '/api/v1/finances/stats/full',
    financesStatisticsByDay: '/api/v1/finances/stats/date',
  },
  notes: {
    notes: '/api/v1/notes',
    noteById: (id) => `/api/v1/notes/${id}`,
  },
  sprints: {
    sprints: '/api/v1/sprints',
    sprintById: (id) => `/api/v1/sprints/${id}`,
    completeSprint: (id) => `/api/v1/sprints/${id}/complete`,
  },
};

export const noAuthEndpoints = [
  'login',
  'forgot-password',
  'reset-password',
  'signup-by-invitation',
];
