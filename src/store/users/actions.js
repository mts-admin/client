import { createAction } from 'redux-actions';

export const types = {
  GET_USERS: 'users/GET_USERS',
  EDIT_USER: 'users/EDIT_USER',
  MANAGE_USERS: 'users/MANAGE_USERS',
  CLEAR: 'users/CLEAR',
  ERROR: 'users/error',
};

export const getUsersRequest = createAction(`${types.GET_USERS}_REQUEST`);
export const getUsersSuccess = createAction(`${types.GET_USERS}_SUCCESS`);

export const editUserRequest = createAction(`${types.EDIT_USER}_REQUEST`);
export const editUserSuccess = createAction(`${types.EDIT_USER}_SUCCESS`);

export const manageUsersRequest = createAction(`${types.MANAGE_USERS}_REQUEST`);
export const manageUsersSuccess = createAction(`${types.MANAGE_USERS}_SUCCESS`);

export const actionError = createAction(types.ERROR);

export const clearUsers = createAction(types.CLEAR);
