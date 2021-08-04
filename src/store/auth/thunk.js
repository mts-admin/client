import { toast } from 'react-toastify';

import history from '../history';
import {
  getMe,
  loginRequest,
  forgotPassword,
  resetPassword,
} from '../../api/auth';
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
import { getErrorMessage } from '../../utils/general';
import { setToken } from '../../utils/local-storage';
import { ROUTE } from '../../routes/constants';

export const handleLogin =
  ({ email, password }) =>
  (dispatch) =>
    Promise.resolve(dispatch(signInRequest()))
      .then(() => loginRequest({ email, password }))
      .then(({ data, token }) => {
        setToken(token);
        toast.success('You have successfully logged in!');
        dispatch(signInSuccess(data));
        history.push(ROUTE.HOME);
      })
      .catch((error) => {
        toast.error(getErrorMessage(error));
        dispatch(actionError(error));
      });

export const handleGetMe = () => (dispatch) =>
  Promise.resolve(dispatch(getMeRequest()))
    .then(() => getMe())
    .then(({ data }) => {
      dispatch(getMeSuccess(data));
    })
    .catch(() => {
      dispatch(getMeError());
    });

export const handleForgotPassword = (email, successCallback) => (dispatch) =>
  Promise.resolve(dispatch(forgotPasswordRequest()))
    .then(() => forgotPassword(email))
    .then(({ message }) => {
      toast.success(message);
      dispatch(forgotPasswordSuccess());
      successCallback();
    })
    .catch((error) => {
      toast.error(getErrorMessage(error));
      dispatch(actionError(error));
    });

export const handleResetPassword =
  ({ token, password, passwordConfirm }) =>
  (dispatch) =>
    Promise.resolve(dispatch(forgotPasswordRequest()))
      .then(() => resetPassword({ token, password, passwordConfirm }))
      .then(({ data, token: userToken }) => {
        setToken(userToken);
        toast.success('You have successfully reset your password!');
        dispatch(signInSuccess(data));
        history.push(ROUTE.HOME);
      })
      .catch((error) => {
        toast.error(getErrorMessage(error));
        dispatch(actionError(error));
      });
