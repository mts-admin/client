import axios from 'axios';

import {
  getSchedule,
  getSchedules,
  createSchedule,
  deleteSchedule,
} from '../../api/schedules';
import {
  actionError,
  getScheduleRequest,
  getScheduleSuccess,
  getSchedulesRequest,
  getSchedulesSuccess,
  createScheduleRequest,
  deleteScheduleRequest,
} from './actions';
import { SCHEDULE_TYPE } from '../../constants/schedules';

export const handleScheduleGet = (scheduleId) => async (dispatch) => {
  try {
    dispatch(getScheduleRequest());

    const { data } = await getSchedule(scheduleId);

    dispatch(getScheduleSuccess(data));
  } catch (error) {
    dispatch(actionError(error));
  }
};

export const handleSchedulesGet =
  ({ type, page, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(getSchedulesRequest());

      const { data, count } = await getSchedules(type, page, cancelToken);

      dispatch(getSchedulesSuccess({ data, count }));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleScheduleCreate =
  ({ body, callback, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(createScheduleRequest());

      await createSchedule(body);

      dispatch(handleSchedulesGet({ type: SCHEDULE_TYPE.MY, cancelToken }));

      callback && callback();
    } catch (error) {
      dispatch(actionError(error));
    }
  };

export const handleScheduleDelete =
  ({ page, callback, scheduleId }) =>
  async (dispatch) => {
    try {
      dispatch(deleteScheduleRequest());

      await deleteSchedule(scheduleId);

      dispatch(handleSchedulesGet({ type: SCHEDULE_TYPE.MY, page }));

      callback && callback();
    } catch (error) {
      dispatch(actionError(error));
    }
  };
