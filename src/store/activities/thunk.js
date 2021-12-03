import axios from 'axios';

import {
  getActivity,
  getMyActivities,
  getUserActivities,
  createActivity,
  editActivity,
  editActivityStatus,
  deleteUserActivity,
} from '../../api/activities';
import {
  getActivitiesRequest,
  getActivitiesSuccess,
  editActivityRequest,
  editActivitySuccess,
  manageActivitiesRequest,
  manageActivitiesSuccess,
  getMyActivityRequest,
  getMyActivitySuccess,
  actionError,
} from './actions';
import { clearNavigationBadge } from '../auth/actions';

export const handleMyActivitiesGet =
  ({ params, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(getActivitiesRequest());

      const { data, count } = await getMyActivities(params, cancelToken);

      dispatch(getActivitiesSuccess({ data, count }));
      dispatch(clearNavigationBadge('newActivitiesCount'));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleUserActivitiesGet =
  ({ userId, params, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(getActivitiesRequest());

      const { data, count } = await getUserActivities(
        userId.id,
        params,
        cancelToken,
      );

      dispatch(getActivitiesSuccess({ data, count: { currentCount: count } }));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleActivityCreate =
  ({ body, userId, callback, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(manageActivitiesRequest());

      await createActivity(body);

      dispatch(handleUserActivitiesGet({ userId, cancelToken }));

      callback && callback(userId);
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleActivityGet = (id) => async (dispatch) => {
  try {
    dispatch(manageActivitiesRequest());

    const { data } = await getActivity(id);

    dispatch(manageActivitiesSuccess(data));
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};

export const handleMyActivityGet = (id) => async (dispatch) => {
  try {
    dispatch(getMyActivityRequest());

    const { data } = await getActivity(id);

    dispatch(getMyActivitySuccess(data));
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};

export const handleActivityEdit =
  ({ id, body, callback }) =>
  async (dispatch) => {
    try {
      dispatch(editActivityRequest());

      const { data } = await editActivity(id, body);

      dispatch(editActivitySuccess(data));

      callback && callback();
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleActivityStatusChange =
  ({ id, body, params }) =>
  async (dispatch) => {
    try {
      dispatch(getActivitiesRequest());

      await editActivityStatus(id, body);
      const { data, count } = await getMyActivities(params);

      dispatch(getActivitiesSuccess({ data, count }));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleActivityDelete =
  ({ id, userId, params, callback, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(manageActivitiesRequest());

      await deleteUserActivity(id);

      callback && callback();

      dispatch(handleUserActivitiesGet({ userId, params, cancelToken }));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };
