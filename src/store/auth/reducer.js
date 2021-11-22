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
  clearNavigationBadge,
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

const clearNavigationBadgeReducer = (state, { payload }) => ({
  ...state,
  user: {
    ...state.user,
    ...(payload && { [payload]: 0 }),
  },
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
    [clearNavigationBadge]: clearNavigationBadgeReducer,
    [actionError]: errorReducer,
  },
  initialState,
);

export default authReducer;
