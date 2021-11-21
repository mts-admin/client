import * as R from 'ramda';
import { combineActions, handleActions } from 'redux-actions';

import { arrayToObject } from '../../utils/general';

import {
  getTasksRequest,
  getTasksSuccess,
  createTaskRequest,
  createTaskSuccess,
  editTaskRequest,
  editTaskSuccess,
  deleteTaskRequest,
  deleteTaskSuccess,
  actionError,
  clearTasks,
} from './actions';

const initialState = {
  items: {
    byId: {},
    allIds: [],
  },
  loading: false,
  initLoading: false,
  error: null,
};

const getTasksSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  items: {
    byId: arrayToObject(payload),
    allIds: payload.map(({ _id }) => _id),
  },
});

const createTaskSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  items: {
    byId: {
      ...state.items.byId,
      [payload._id]: payload,
    },
    allIds: state.items.allIds.concat(payload._id),
  },
});

const editTaskSuccessReducer = (state, { payload }) => ({
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

const deleteTaskSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  items: {
    byId: R.omit([payload.taskId], state.items.byId),
    allIds: R.without([payload.taskId], state.items.allIds),
  },
});

const errorReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: payload,
});

const clearTasksReducer = () => initialState;

const tasksReducer = handleActions(
  {
    [getTasksRequest]: R.mergeDeepLeft({
      initLoading: true,
    }),
    [combineActions(createTaskRequest, editTaskRequest, deleteTaskRequest)]:
      R.mergeDeepLeft({
        loading: true,
      }),
    [getTasksSuccess]: getTasksSuccessReducer,
    [createTaskSuccess]: createTaskSuccessReducer,
    [editTaskSuccess]: editTaskSuccessReducer,
    [deleteTaskSuccess]: deleteTaskSuccessReducer,
    [actionError]: errorReducer,
    [clearTasks]: clearTasksReducer,
  },
  initialState,
);

export default tasksReducer;
