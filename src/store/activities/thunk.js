import axios from 'axios';

import { getMyActivities, getActivity } from '../../api/activities';
import {
  getActivitiesRequest,
  getActivitiesSuccess,
  manageActivitiesRequest,
  manageActivitiesSuccess,
  getMyActivityRequest,
  getMyActivitySuccess,
  actionError,
} from './actions';
import { clearNavigationBadge } from '../auth/actions';

export const handleMyActivitiesGet =
  ({ params, cancelToken, callback }) =>
  async (dispatch) => {
    try {
      dispatch(getActivitiesRequest());

      const { data, count } = await getMyActivities(params, cancelToken);

      callback && callback(count.restCount);

      dispatch(getActivitiesSuccess({ data, count }));
      dispatch(clearNavigationBadge('newActivitiesCount'));
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
