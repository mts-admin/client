import * as R from 'ramda';
import { combineActions, handleActions } from 'redux-actions';

import { arrayToObject } from '../../utils/general';

import {
  getFinancesRequest,
  getFinancesSuccess,
  manageFinancesRequest,
  manageFinancesSuccess,
  editFinancesRequest,
  editFinancesSuccess,
  getFinancesStatisticsRequest,
  getFinancesStatisticsSuccess,
  actionError,
  clearFinances,
} from './actions';

const initialState = {
  items: {
    byId: {},
    allIds: [],
  },
  totalCount: 0,
  currentItem: {},
  loading: false,
  initLoading: false,
  error: null,
  statistics: null,
};

const getFinancesSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  items: {
    byId: arrayToObject(payload.data),
    allIds: payload.data.map(({ _id }) => _id),
  },
  totalCount: payload.count,
});

const editFinanceSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  items: {
    byId: {
      ...state.items.byId,
      [payload._id]: payload,
    },
    allIds: state.items.allIds,
  },
});

const manageFinancesSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  currentItem: payload || {},
});

const getFinancesStatisticsSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  statistics: payload,
});

const errorReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: payload,
});

const clearFinancesReducer = () => initialState;

const financesReducer = handleActions(
  {
    [getFinancesRequest]: R.mergeDeepLeft({ initLoading: true }),
    [combineActions(manageFinancesRequest, editFinancesRequest)]:
      R.mergeDeepLeft({ loading: true }),
    [getFinancesStatisticsRequest]: R.mergeDeepLeft({ loading: true }),
    [getFinancesSuccess]: getFinancesSuccessReducer,
    [editFinancesSuccess]: editFinanceSuccessReducer,
    [manageFinancesSuccess]: manageFinancesSuccessReducer,
    [getFinancesStatisticsSuccess]: getFinancesStatisticsSuccessReducer,
    [actionError]: errorReducer,
    [clearFinances]: clearFinancesReducer,
  },
  initialState,
);

export default financesReducer;
