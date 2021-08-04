import { createAction } from 'redux-actions';

export const types = {
  SIGN_IN: 'auth/SIGN_IN',
  GET_ME: 'auth/GET_ME',
  FORGOT_PASSWORD: 'auth/FORGOT_PASSWORD',
  ERROR: 'auth/error',
};

export const getMeRequest = createAction(`${types.GET_ME}_REQUEST`);
export const getMeSuccess = createAction(`${types.GET_ME}_SUCCESS`);
export const getMeError = createAction(`${types.GET_ME}_ERROR`);

export const signInRequest = createAction(`${types.SIGN_IN}_REQUEST`);
export const signInSuccess = createAction(`${types.SIGN_IN}_SUCCESS`);

export const forgotPasswordRequest = createAction(
  `${types.FORGOT_PASSWORD}_REQUEST`,
);
export const forgotPasswordSuccess = createAction(
  `${types.FORGOT_PASSWORD}_SUCCESS`,
);

export const actionError = createAction(types.ERROR);
