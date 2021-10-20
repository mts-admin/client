import * as R from 'ramda';
import { handleActions, combineActions } from 'redux-actions';

import { arrayToObject } from '../../utils/general';

import {
  actionError,
  clearSchedules,
  clearCurrentSchedule,
  getScheduleRequest,
  getScheduleSuccess,
  getSchedulesRequest,
  getSchedulesSuccess,
  createScheduleRequest,
  deleteScheduleRequest,
  leaveScheduleRequest,
  editScheduleRequest,
  editScheduleSuccess,
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

const getScheduleSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  currentItem: payload,
});

const getSchedulesSuccessReducer = (state, { payload }) => ({
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

const editScheduleSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  currentItem: payload,
  items: {
    byId: {
      ...state.items.byId,
      [payload._id]: payload,
    },
    allIds: state.items.allIds,
  },
});

const errorReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: payload,
});

const clearCurrentScheduleReducer = (state) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  currentItem: {},
});

const clearSchedulesReducer = () => initialState;

const authReducer = handleActions(
  {
    [getSchedulesRequest]: R.mergeDeepLeft({ initLoading: true }),
    [combineActions(
      getScheduleRequest,
      createScheduleRequest,
      deleteScheduleRequest,
      leaveScheduleRequest,
      editScheduleRequest,
    )]: R.mergeDeepLeft({ loading: true }),
    [getSchedulesSuccess]: getSchedulesSuccessReducer,
    [getScheduleSuccess]: getScheduleSuccessReducer,
    [editScheduleSuccess]: editScheduleSuccessReducer,
    [actionError]: errorReducer,
    [clearCurrentSchedule]: clearCurrentScheduleReducer,
    [clearSchedules]: clearSchedulesReducer,
  },
  initialState,
);

export default authReducer;
