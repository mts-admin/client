import * as R from 'ramda';
import { handleActions } from 'redux-actions';

import {
  getVisitsRequest,
  getVisitsSuccess,
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

const errorReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: payload,
});

const visitsReducer = handleActions(
  {
    [getVisitsRequest]: R.mergeDeepLeft({ initLoading: true, items: [] }),
    [manageVisitsRequest]: R.mergeDeepLeft({ loading: true }),
    [getVisitsSuccess]: getVisitsSuccessReducer,
    [actionError]: errorReducer,
    [clearVisits]: () => initialState,
  },
  initialState,
);

export default visitsReducer;
