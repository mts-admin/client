import * as R from 'ramda';
import { handleActions, combineActions } from 'redux-actions';

import { arrayToObject } from '../../utils/general';

import {
  actionError,
  getScheduleRequest,
  getScheduleSuccess,
  getSchedulesRequest,
  getSchedulesSuccess,
  createScheduleRequest,
  deleteScheduleRequest,
} from './actions';

const initialState = {
  items: {
    byId: {},
    allIds: [],
  },
  totalCount: 0,
  currentItem: {},
  loading: false,
  error: null,
};

const getScheduleSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  current: payload,
});

const getSchedulesSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  items: {
    byId: arrayToObject(payload.data),
    allIds: payload.data.map(({ _id }) => _id),
  },
  totalCount: payload.count,
});

const errorReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload,
});

const authReducer = handleActions(
  {
    [combineActions(
      getScheduleRequest,
      getSchedulesRequest,
      createScheduleRequest,
      deleteScheduleRequest,
    )]: R.mergeDeepLeft({ loading: true }),
    [getSchedulesSuccess]: getSchedulesSuccessReducer,
    [getScheduleSuccess]: getScheduleSuccessReducer,
    [actionError]: errorReducer,
  },
  initialState,
);

export default authReducer;
