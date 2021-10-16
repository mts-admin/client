import { createAction } from 'redux-actions';

export const types = {
  GET_SCHEDULE: 'schedule/GET_SCHEDULE',
  GET_SCHEDULES: 'schedules/GET_SCHEDULES',
  CREATE_SCHEDULE: 'schedules/CREATE_SCHEDULE',
  DELETE_SCHEDULE: 'schedules/DELETE_SCHEDULE',
  CLEAR_CURRENT_SCHEDULE: 'schedules/CLEAR_CURRENT_SCHEDULE',
  CLEAR_SCHEDULES: 'schedules/CLEAR_SCHEDULES',
  ERROR: 'schedules/error',
};

export const getScheduleRequest = createAction(`${types.GET_SCHEDULE}_REQUEST`);
export const getScheduleSuccess = createAction(`${types.GET_SCHEDULE}_SUCCESS`);

export const getSchedulesRequest = createAction(
  `${types.GET_SCHEDULES}_REQUEST`,
);
export const getSchedulesSuccess = createAction(
  `${types.GET_SCHEDULES}_SUCCESS`,
);

export const createScheduleRequest = createAction(
  `${types.CREATE_SCHEDULE}_REQUEST`,
);
export const createScheduleSuccess = createAction(
  `${types.CREATE_SCHEDULE}_SUCCESS`,
);

export const deleteScheduleRequest = createAction(
  `${types.DELETE_SCHEDULE}_REQUEST`,
);
export const deleteScheduleSuccess = createAction(
  `${types.DELETE_SCHEDULE}_SUCCESS`,
);

export const actionError = createAction(types.ERROR);

export const clearCurrentSchedule = createAction(types.CLEAR_CURRENT_SCHEDULE);
export const clearSchedules = createAction(types.CLEAR_SCHEDULES);
