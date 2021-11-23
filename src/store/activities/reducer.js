import * as R from 'ramda';
import { combineActions, handleActions } from 'redux-actions';

import { arrayToObject } from '../../utils/general';

import {
  getActivitiesRequest,
  getActivitiesSuccess,
  manageActivitiesRequest,
  manageActivitiesSuccess,
  getMyActivityRequest,
  getMyActivitySuccess,
  actionError,
  clearActivities,
} from './actions';

const initialState = {
  items: {
    byId: {},
    allIds: [],
  },
  totalCount: 0,
  restCount: 0,
  currentItem: {},
  loading: false,
  initLoading: false,
  error: null,
};

const getActivitiesSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  items: {
    byId: arrayToObject(payload.data),
    allIds: payload.data.map(({ _id }) => _id),
  },
  totalCount: payload.count.currentCount,
  restCount: payload.count.restCount,
});

const getMyActivitySuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  currentItem: payload,
  items: {
    allIds: state.items.allIds,
    byId: {
      ...state.items.byId,
      [payload._id]: payload,
    },
  },
});

const manageActivitiesSuccessReducer = (state, { payload }) => ({
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

const clearActivitiesReducer = () => initialState;

const activitiesReducer = handleActions(
  {
    [getActivitiesRequest]: R.mergeDeepLeft({ initLoading: true }),
    [combineActions(manageActivitiesRequest, getMyActivityRequest)]:
      R.mergeDeepLeft({
        loading: true,
      }),
    [getActivitiesSuccess]: getActivitiesSuccessReducer,
    [manageActivitiesSuccess]: manageActivitiesSuccessReducer,
    [getMyActivitySuccess]: getMyActivitySuccessReducer,
    [actionError]: errorReducer,
    [clearActivities]: clearActivitiesReducer,
  },
  initialState,
);

export default activitiesReducer;
