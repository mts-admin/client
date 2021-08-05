import * as R from 'ramda';
import { handleActions, combineActions } from 'redux-actions';

import {
  actionError,
  signInRequest,
  signInSuccess,
  getMeRequest,
  getMeSuccess,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  getInvitationDataRequest,
  getInvitationDataSuccess,
  signUpByInvitationRequest,
  signUpByInvitationSuccess,
} from './actions';

const initialState = {
  user: {},
  loading: false,
  initLoading: false,
  invitationLoading: false,
  error: null,
};

const signInSuccessReducer = (state, { payload }) => ({
  ...state,
  user: payload,
  loading: false,
  initLoading: false,
  invitationLoading: false,
});

const errorReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  invitationLoading: false,
  error: payload,
});

const authReducer = handleActions(
  {
    [combineActions(
      signInRequest,
      forgotPasswordRequest,
      signUpByInvitationRequest,
    )]: R.mergeDeepLeft({
      loading: true,
    }),
    [getMeRequest]: R.mergeDeepLeft({
      initLoading: true,
    }),
    [getInvitationDataRequest]: R.mergeDeepLeft({
      invitationLoading: true,
    }),
    [combineActions(
      signInSuccess,
      getMeSuccess,
      getInvitationDataSuccess,
      signUpByInvitationSuccess,
    )]: signInSuccessReducer,
    [forgotPasswordSuccess]: R.mergeDeepLeft({
      loading: false,
    }),
    [actionError]: errorReducer,
  },
  initialState,
);

export default authReducer;
