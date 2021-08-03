import { createAction } from 'redux-actions';

export const types = {
  SIGN_IN: 'SIGN_IN',
  GET_ME: 'GET_ME',
};

export const signInRequest = createAction(`${types.SIGN_IN}_REQUEST`);
export const signInSuccess = createAction(`${types.SIGN_IN}_SUCCESS`);
export const signInError = createAction(`${types.SIGN_IN}_ERROR`);

export const getMeRequest = createAction(`${types.GET_ME}_REQUEST`);
export const getMeSuccess = createAction(`${types.GET_ME}_SUCCESS`);
export const getMeError = createAction(`${types.GET_ME}_ERROR`);
