import { createAction } from 'redux-actions';

export const types = {
  SIGN_IN: 'auth/SIGN_IN',
  GET_ME: 'auth/GET_ME',
  FORGOT_PASSWORD: 'auth/FORGOT_PASSWORD',
  GET_INVITATION_DATA: 'auth/GET_INVITATION_DATA',
  SIGN_UP_BY_INVITATION: 'auth/SIGN_UP_BY_INVITATION',
  CLEAR_NAVIGATION_BADGE: 'auth/CLEAR_NAVIGATION_BADGE',
  ERROR: 'auth/error',
};

export const getMeRequest = createAction(`${types.GET_ME}_REQUEST`);
export const getMeSuccess = createAction(`${types.GET_ME}_SUCCESS`);

export const signInRequest = createAction(`${types.SIGN_IN}_REQUEST`);
export const signInSuccess = createAction(`${types.SIGN_IN}_SUCCESS`);

export const forgotPasswordRequest = createAction(
  `${types.FORGOT_PASSWORD}_REQUEST`,
);
export const forgotPasswordSuccess = createAction(
  `${types.FORGOT_PASSWORD}_SUCCESS`,
);

export const getInvitationDataRequest = createAction(
  `${types.GET_INVITATION_DATA}_REQUEST`,
);
export const getInvitationDataSuccess = createAction(
  `${types.GET_INVITATION_DATA}_SUCCESS`,
);

export const signUpByInvitationRequest = createAction(
  `${types.SIGN_UP_BY_INVITATION}_REQUEST`,
);
export const signUpByInvitationSuccess = createAction(
  `${types.SIGN_UP_BY_INVITATION}_SUCCESS`,
);

export const clearNavigationBadge = createAction(types.CLEAR_NAVIGATION_BADGE);

export const actionError = createAction(types.ERROR);
