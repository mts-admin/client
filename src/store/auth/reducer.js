import * as R from 'ramda';
import { handleActions, combineActions } from 'redux-actions';

import {
  actionError,
  signInRequest,
  signInSuccess,
  getMeRequest,
  getMeSuccess,
  updateMeRequest,
  updateMeSuccess,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  getInvitationDataRequest,
  getInvitationDataSuccess,
  signUpByInvitationRequest,
  signUpByInvitationSuccess,
  clearNavigationBadge,
  logoutSuccess,
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
  user: {
    ...payload,
    ...(state.user.newBonusesCount && {
      newBonusesCount: state.user.newBonusesCount,
    }),
    ...(state.user.newActivitiesCount && {
      newActivitiesCount: state.user.newActivitiesCount,
    }),
  },
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

const logoutSuccessReducer = () => initialState;

const authReducer = handleActions(
  {
    [combineActions(
      signInRequest,
      updateMeRequest,
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
      updateMeSuccess,
      getInvitationDataSuccess,
      signUpByInvitationSuccess,
    )]: signInSuccessReducer,
    [forgotPasswordSuccess]: R.mergeDeepLeft({
      loading: false,
    }),
    [logoutSuccess]: logoutSuccessReducer,
    [clearNavigationBadge]: clearNavigationBadgeReducer,
    [actionError]: errorReducer,
  },
  initialState,
);

export default authReducer;
