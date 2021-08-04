import * as R from 'ramda';
import { handleActions, combineActions } from 'redux-actions';

import {
  actionError,
  signInRequest,
  signInSuccess,
  getMeRequest,
  getMeSuccess,
  getMeError,
  forgotPasswordRequest,
  forgotPasswordSuccess,
} from './actions';

const initialState = {
  user: {},
  loading: false,
  initLoading: false,
  error: null,
};

const signInSuccessReducer = (state, { payload }) => ({
  ...state,
  user: payload,
  loading: false,
  initLoading: false,
});

const errorReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  error: payload,
});

const authReducer = handleActions(
  {
    [combineActions(signInRequest, forgotPasswordRequest)]: R.mergeDeepLeft({
      loading: true,
    }),
    [combineActions(signInSuccess, getMeSuccess)]: signInSuccessReducer,
    [forgotPasswordSuccess]: R.mergeDeepLeft({
      loading: false,
    }),
    [getMeRequest]: R.mergeDeepLeft({
      initLoading: true,
    }),
    [getMeError]: R.mergeDeepLeft({
      initLoading: false,
    }),
    [actionError]: errorReducer,
  },
  initialState,
);

export default authReducer;
