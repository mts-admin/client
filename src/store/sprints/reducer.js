import * as R from 'ramda';
import { handleActions } from 'redux-actions';

import { arrayToObject } from '../../utils/general';

import {
  getSprintsRequest,
  getSprintsSuccess,
  manageSprintsRequest,
  manageSprintsSuccess,
  actionError,
  clearSprints,
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
};

const getSprintsSuccessReducer = (state, { payload }) => ({
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

const manageSprintsSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  currentItem: payload || {},
});

const errorReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: payload,
});

const clearSprintsReducer = () => initialState;

const sprintsReducer = handleActions(
  {
    [getSprintsRequest]: R.mergeDeepLeft({
      initLoading: true,
    }),
    [manageSprintsRequest]: R.mergeDeepLeft({
      loading: true,
    }),
    [getSprintsSuccess]: getSprintsSuccessReducer,
    [manageSprintsSuccess]: manageSprintsSuccessReducer,
    [actionError]: errorReducer,
    [clearSprints]: clearSprintsReducer,
  },
  initialState,
);

export default sprintsReducer;
