import axios from 'axios';
import { toast } from 'react-toastify';

import {
  getUsers,
  getUser,
  editUser,
  inviteUser,
  cancelInvitation,
} from '../../api/users';
import {
  getUsersRequest,
  getUsersSuccess,
  editUserRequest,
  editUserSuccess,
  manageUsersRequest,
  manageUsersSuccess,
  actionError,
} from './actions';

export const handleUsersGet =
  ({ params, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(getUsersRequest());

      const { data, count } = await getUsers(params, cancelToken);

      dispatch(getUsersSuccess({ data, count }));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleUserInvite =
  ({ body, params, callback, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(manageUsersRequest());

      await inviteUser(body);

      dispatch(handleUsersGet({ params, cancelToken }));

      callback && callback();
      toast.success('User has been invited successfully!');
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleUserEdit =
  ({ id, body, callback }) =>
  async (dispatch) => {
    try {
      dispatch(editUserRequest());

      const { data } = await editUser(id, body);

      dispatch(editUserSuccess(data));

      callback && callback();
      toast.success('User has been updated successfully!');
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleUserGet = (id) => async (dispatch) => {
  try {
    dispatch(manageUsersRequest());

    const { data } = await getUser(id);

    dispatch(manageUsersSuccess(data));
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};

export const handleCancelInvitation =
  ({ token, params, callback, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(manageUsersRequest());

      await cancelInvitation(token);

      dispatch(handleUsersGet({ params, cancelToken }));

      callback && callback();
      toast.success('User invitation has been cancelled successfully!');
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };
