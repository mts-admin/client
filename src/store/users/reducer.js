import * as R from 'ramda';
import { combineActions, handleActions } from 'redux-actions';

import { arrayToObject } from '../../utils/general';

import {
  getUsersRequest,
  getUsersSuccess,
  editUserRequest,
  editUserSuccess,
  manageUsersRequest,
  manageUsersSuccess,
  actionError,
  clearUsers,
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

const getUsersSuccessReducer = (state, { payload }) => ({
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

const editUserSuccessReducer = (state, { payload }) => ({
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

const manageUsersSuccessReducer = (state, { payload }) => ({
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

const clearUsersReducer = () => initialState;

const usersReducer = handleActions(
  {
    [getUsersRequest]: R.mergeDeepLeft({ initLoading: true }),
    [combineActions(manageUsersRequest, editUserRequest)]: R.mergeDeepLeft({
      loading: true,
    }),
    [getUsersSuccess]: getUsersSuccessReducer,
    [editUserSuccess]: editUserSuccessReducer,
    [manageUsersSuccess]: manageUsersSuccessReducer,
    [actionError]: errorReducer,
    [clearUsers]: clearUsersReducer,
  },
  initialState,
);

export default usersReducer;
