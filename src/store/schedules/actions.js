import { createAction } from 'redux-actions';

export const types = {
  GET_SCHEDULE: 'schedule/GET_SCHEDULE',
  GET_SCHEDULES: 'schedules/GET_SCHEDULES',
  CREATE_SCHEDULE: 'schedules/CREATE_SCHEDULE',
  DELETE_SCHEDULE: 'schedules/DELETE_SCHEDULE',
  CLEAR_CURRENT_SCHEDULE: 'schedules/CLEAR_CURRENT_SCHEDULE',
  LEAVE_SCHEDULE: 'schedules/LEAVE_SCHEDULE',
  EDIT_SCHEDULE: 'schedules/EDIT_SCHEDULE',
  CLEAR: 'schedules/CLEAR',
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

export const leaveScheduleRequest = createAction(
  `${types.LEAVE_SCHEDULE}_REQUEST`,
);
export const leaveScheduleSuccess = createAction(
  `${types.LEAVE_SCHEDULE}_SUCCESS`,
);

export const editScheduleRequest = createAction(
  `${types.EDIT_SCHEDULE}_REQUEST`,
);
export const editScheduleSuccess = createAction(
  `${types.EDIT_SCHEDULE}_SUCCESS`,
);

export const actionError = createAction(types.ERROR);

export const clearCurrentSchedule = createAction(types.CLEAR_CURRENT_SCHEDULE);
export const clearSchedules = createAction(types.CLEAR);
