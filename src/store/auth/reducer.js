import * as R from 'ramda';
import { handleActions, combineActions } from 'redux-actions';

import {
  signInRequest,
  signInSuccess,
  signInError,
  getMeRequest,
  getMeSuccess,
  getMeError,
} from './actions';

const initialState = {
  user: {},
  loading: false,
  initLoading: false,
};

const signInSuccessReducer = (state, { payload }) => ({
  ...state,
  user: payload,
  loading: false,
  initLoading: false,
});

const authReducer = handleActions(
  {
    [signInRequest]: R.mergeDeepLeft({
      loading: true,
    }),
    [combineActions(signInSuccess, getMeSuccess)]: signInSuccessReducer,
    [signInError]: R.mergeDeepLeft({
      loading: false,
    }),
    [getMeRequest]: R.mergeDeepLeft({
      initLoading: true,
    }),
    [getMeError]: R.mergeDeepLeft({
      initLoading: false,
    }),
  },
  initialState,
);

export default authReducer;
