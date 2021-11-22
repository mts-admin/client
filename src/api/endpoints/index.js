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
  },
  visits: {
    visits: (scheduleId) => `/api/v1/schedules/${scheduleId}/visits`,
    oneOffVisit: (scheduleId) =>
      `/api/v1/schedules/${scheduleId}/visits/one-off`,
    recurringVisits: (scheduleId) =>
      `/api/v1/schedules/${scheduleId}/visits/recurring`,
    visitById: (scheduleId, visitId) =>
      `/api/v1/schedules/${scheduleId}/visits/${visitId}`,
    visitsGroup: (scheduleId, visitId) =>
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
  tasks: {
    tasks: (sprintId) => `api/v1/sprints/${sprintId}/tasks`,
    taskById: (sprintId, taskId) =>
      `api/v1/sprints/${sprintId}/tasks/${taskId}`,
  },
  bonuses: {
    myBonuses: 'api/v1/bonuses',
    bonusById: (id) => `api/v1/bonuses/${id}`,
  },
};

export const noAuthEndpoints = [
  'login',
  'forgot-password',
  'reset-password',
  'signup-by-invitation',
];
