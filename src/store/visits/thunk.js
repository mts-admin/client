import axios from 'axios';
import { toast } from 'react-toastify';

import {
  getVisit,
  getVisits,
  createOneOffVisit,
  createRecurringVisits,
  editVisit,
  editAllVisits,
  deleteVisit,
  deleteAllVisits,
} from '../../api/visits';
import {
  getVisitsRequest,
  getVisitsSuccess,
  getVisitRequest,
  getVisitSuccess,
  manageVisitsRequest,
  actionError,
} from './actions';

export const handleVisitsGet =
  ({ id, params, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(getVisitsRequest());

      const { data } = await getVisits({ id, params, cancelToken });

      dispatch(getVisitsSuccess(data));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleVisitGet =
  ({ scheduleId, visitId }) =>
  async (dispatch) => {
    try {
      dispatch(getVisitRequest());

      const { data } = await getVisit(scheduleId, visitId);

      dispatch(getVisitSuccess(data));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleOneOffVisitCreate =
  ({ id, body, params, callback }) =>
  async (dispatch) => {
    try {
      dispatch(manageVisitsRequest());

      await createOneOffVisit(id, body);

      dispatch(handleVisitsGet({ id, params }));

      callback && callback();

      toast.success('Visit has been created successfully!');
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleRecurringVisitsCreate =
  ({ id, body, params, callback }) =>
  async (dispatch) => {
    try {
      dispatch(manageVisitsRequest());

      await createRecurringVisits(id, body);

      dispatch(handleVisitsGet({ id, params }));

      callback && callback();

      toast.success('Visits have been created successfully!');
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleVisitEdit =
  ({ scheduleId, visitId, body, params, callback }) =>
  async (dispatch) => {
    try {
      dispatch(manageVisitsRequest());

      await editVisit(scheduleId, visitId, body);

      dispatch(handleVisitsGet({ id: scheduleId, params }));

      callback && callback();

      toast.success('Visit has been updated successfully!');
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleAllVisitsEdit =
  ({ scheduleId, visitId, body, params, callback }) =>
  async (dispatch) => {
    try {
      dispatch(manageVisitsRequest());

      await editAllVisits(scheduleId, visitId, body);

      dispatch(handleVisitsGet({ id: scheduleId, params }));

      callback && callback();

      toast.success('Visits have been updated successfully!');
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleVisitDelete =
  ({ scheduleId, visitId, params, callback }) =>
  async (dispatch) => {
    try {
      dispatch(manageVisitsRequest());

      await deleteVisit(scheduleId, visitId);

      dispatch(handleVisitsGet({ id: scheduleId, params }));

      callback && callback();

      toast.success('Visit has been deleted successfully!');
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleAllVisitsDelete =
  ({ scheduleId, visitId, params, callback }) =>
  async (dispatch) => {
    try {
      dispatch(manageVisitsRequest());

      await deleteAllVisits(scheduleId, visitId);

      dispatch(handleVisitsGet({ id: scheduleId, params }));

      callback && callback();

      toast.success('Visits have been deleted successfully!');
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };
