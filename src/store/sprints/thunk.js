import axios from 'axios';
import { toast } from 'react-toastify';

import history from '../history';
import {
  getSprints,
  getSprint,
  createSprint,
  editSprint,
  completeSprint,
  deleteSprint,
} from '../../api/sprints';
import {
  getSprintsRequest,
  getSprintsSuccess,
  manageSprintsRequest,
  manageSprintsSuccess,
  actionError,
} from './actions';
import { DYNAMIC_ROUTE, ROUTE } from '../../routes/constants';

export const handleSprintsGet =
  ({ params, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(getSprintsRequest());

      const { data, count } = await getSprints(params, cancelToken);

      dispatch(getSprintsSuccess({ data, count }));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleSprintGet = (id) => async (dispatch) => {
  try {
    dispatch(manageSprintsRequest());

    const { data } = await getSprint(id);

    dispatch(manageSprintsSuccess(data));
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};

export const handleSprintCreate = (body, callback) => async (dispatch) => {
  try {
    dispatch(manageSprintsRequest());

    const { data } = await createSprint(body);

    dispatch(manageSprintsSuccess());

    callback && callback();

    history.push(DYNAMIC_ROUTE.SPRINT(data._id));

    toast.success('Sprint has been created successfully!');
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};

export const handleSprintEdit =
  ({ id, body, params, callback }) =>
  async (dispatch) => {
    try {
      dispatch(manageSprintsRequest());

      const { data } = await editSprint(id, body);

      callback && callback();

      if (params) {
        dispatch(handleSprintsGet({ params }));
      } else {
        dispatch(manageSprintsSuccess(data));
      }

      toast.success('Sprint has been updated successfully!');
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleSprintComplete = (id) => async (dispatch) => {
  try {
    dispatch(manageSprintsRequest());

    const { data } = await completeSprint(id);

    dispatch(manageSprintsSuccess(data));

    toast.success('Sprint has been completed successfully!');
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};

export const handleSprintDelete =
  ({ id, params, callback }) =>
  async (dispatch) => {
    try {
      dispatch(manageSprintsRequest());

      await deleteSprint(id);

      callback && callback();

      if (params) {
        dispatch(handleSprintsGet({ params }));
      } else {
        history.push(ROUTE.SPRINTS);
      }

      toast.success('Sprint has been deleted successfully!');
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };
