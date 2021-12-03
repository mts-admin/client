import * as R from 'ramda';
import { handleActions, combineActions } from 'redux-actions';

import {
  getVisitsRequest,
  getVisitsSuccess,
  getVisitRequest,
  getVisitSuccess,
  manageVisitsRequest,
  actionError,
  clearVisits,
} from './actions';

const initialState = {
  items: [],
  currentItem: {},
  loading: false,
  initLoading: false,
  error: null,
};

const getVisitsSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  items: payload,
});

const getVisitSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  currentItem: payload,
});

const errorReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: payload,
});

const visitsReducer = handleActions(
  {
    [getVisitsRequest]: R.mergeDeepLeft({
      initLoading: true,
      items: [],
    }),
    [combineActions(manageVisitsRequest, getVisitRequest)]: R.mergeDeepLeft({
      loading: true,
    }),
    [getVisitsSuccess]: getVisitsSuccessReducer,
    [getVisitSuccess]: getVisitSuccessReducer,
    [actionError]: errorReducer,
    [clearVisits]: () => initialState,
  },
  initialState,
);

export default visitsReducer;
