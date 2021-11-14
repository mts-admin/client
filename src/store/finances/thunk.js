import axios from 'axios';
import * as R from 'ramda';

import {
  createFinance,
  getFinances,
  getFinance,
  editFinance,
  deleteFinance,
  getFinancesFullStatistics,
  getFinancesStatisticsByDay,
} from '../../api/finances';
import { FINANCE_STATISTICS_TYPE } from '../../constants/finances';
import {
  getFinancesRequest,
  getFinancesSuccess,
  manageFinancesRequest,
  editFinancesRequest,
  editFinancesSuccess,
  getFinancesStatisticsRequest,
  getFinancesStatisticsSuccess,
  actionError,
  manageFinancesSuccess,
} from './actions';

export const handleFinancesGet =
  ({ params, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(getFinancesRequest());

      const { data, count } = await getFinances(params, cancelToken);

      dispatch(getFinancesSuccess({ data, count }));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleFinanceCreate =
  ({ body, callback, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(manageFinancesRequest());

      await createFinance(body);

      dispatch(handleFinancesGet({ cancelToken }));

      callback && callback();
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleFinanceEdit =
  ({ id, body, callback }) =>
  async (dispatch) => {
    try {
      dispatch(editFinancesRequest());

      const { data } = await editFinance(id, body);

      dispatch(editFinancesSuccess(data));

      callback && callback();
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleFinanceGet = (id) => async (dispatch) => {
  try {
    dispatch(manageFinancesRequest());

    const { data } = await getFinance(id);

    dispatch(manageFinancesSuccess(data));
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};

export const handleFinanceDelete =
  ({ id, params, callback, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(manageFinancesRequest());

      await deleteFinance(id);

      dispatch(handleFinancesGet({ params, cancelToken }));

      callback && callback();
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleFinancesStatisticsGet =
  ({ type, params, cancelToken }) =>
  async (dispatch) => {
    try {
      const makeRequest = R.cond([
        [
          R.equals(FINANCE_STATISTICS_TYPE.FULL),
          () => getFinancesFullStatistics,
        ],
        [
          R.equals(FINANCE_STATISTICS_TYPE.BY_DAY),
          () => getFinancesStatisticsByDay,
        ],
      ])(type);

      dispatch(getFinancesStatisticsRequest());

      const { data } = await makeRequest(params, cancelToken);

      dispatch(getFinancesStatisticsSuccess(data));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };
