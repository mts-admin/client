import axios from 'axios';
import { toast } from 'react-toastify';

import {
  getSchedule,
  getSchedules,
  createSchedule,
  deleteSchedule,
  leaveSchedule,
  editSchedule,
  addScheduleParticipant,
  editScheduleParticipant,
  deleteScheduleParticipant,
} from '../../api/schedules';
import {
  actionError,
  getScheduleRequest,
  getScheduleSuccess,
  getSchedulesRequest,
  getSchedulesSuccess,
  createScheduleRequest,
  createScheduleSuccess,
  deleteScheduleRequest,
  leaveScheduleRequest,
  editScheduleRequest,
  editScheduleSuccess,
} from './actions';
import { SCHEDULE_TYPE } from '../../constants/schedules';
import { DYNAMIC_ROUTE } from '../../routes/constants';
import history from '../history';

export const handleScheduleGet =
  (scheduleId, cancelToken) => async (dispatch) => {
    try {
      dispatch(getScheduleRequest());

      const { data } = await getSchedule(scheduleId, cancelToken);

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
  ({ body, callback }) =>
  async (dispatch) => {
    try {
      dispatch(createScheduleRequest());

      const { data } = await createSchedule(body);

      dispatch(createScheduleSuccess());

      callback && callback();

      history.push(DYNAMIC_ROUTE.SCHEDULE(data._id));

      toast.success('Schedule has been created successfully!');
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

export const handleScheduleLeave =
  ({ page, scheduleId, callback }) =>
  async (dispatch) => {
    try {
      dispatch(leaveScheduleRequest());

      await leaveSchedule(scheduleId);

      dispatch(handleSchedulesGet({ type: SCHEDULE_TYPE.SHARED, page }));

      callback && callback();
    } catch (error) {
      dispatch(actionError(error));
    }
  };

export const handleScheduleEdit =
  ({ body, scheduleId, callback }) =>
  async (dispatch) => {
    try {
      dispatch(editScheduleRequest());

      const { data } = await editSchedule(body, scheduleId);

      dispatch(editScheduleSuccess(data));

      callback && callback();
    } catch (error) {
      dispatch(actionError(error));
    }
  };

export const handleScheduleParticipantAdd =
  ({ body, scheduleId, callback }) =>
  async (dispatch) => {
    try {
      dispatch(editScheduleRequest());

      const { data } = await addScheduleParticipant(body, scheduleId);

      dispatch(editScheduleSuccess(data));

      callback && callback();
    } catch (error) {
      dispatch(actionError(error));
    }
  };

export const handleScheduleParticipantEdit =
  ({ body, scheduleId, callback }) =>
  async (dispatch) => {
    try {
      dispatch(editScheduleRequest());

      const { data } = await editScheduleParticipant(body, scheduleId);

      dispatch(editScheduleSuccess(data));

      callback && callback();
    } catch (error) {
      dispatch(actionError(error));
    }
  };

export const handleScheduleParticipantDelete =
  ({ body, scheduleId }) =>
  async (dispatch) => {
    try {
      dispatch(editScheduleRequest());

      const { data } = await deleteScheduleParticipant(body, scheduleId);

      dispatch(editScheduleSuccess(data));
    } catch (error) {
      dispatch(actionError(error));
    }
  };
