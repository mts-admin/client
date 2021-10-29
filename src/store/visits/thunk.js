import axios from 'axios';
import { toast } from 'react-toastify';

import {
  getVisits,
  createOneOffVisit,
  createRecurringVisits,
} from '../../api/visits';
import {
  getVisitsRequest,
  getVisitsSuccess,
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
