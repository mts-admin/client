import { toast } from 'react-toastify';

import history from '../history';
import {
  getMe,
  loginRequest,
  forgotPassword,
  resetPassword,
  getInvitationData,
  signUpByInvitation,
  updateMe,
  updateMyEmail,
  updateMyPassword,
} from '../../api/auth';
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
  logoutSuccess,
} from './actions';
import { clearStorage, setToken } from '../../utils/local-storage';
import { ROUTE } from '../../routes/constants';

export const handleLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(signInRequest());

      const { data, token } = await loginRequest({ email, password });

      setToken(token);
      dispatch(signInSuccess(data));
      toast.success('You have successfully logged in!');
      history.push(ROUTE.HOME);
    } catch (error) {
      dispatch(actionError(error));
    }
  };

export const handleGetMe = () => async (dispatch) => {
  try {
    dispatch(getMeRequest());

    const { data } = await getMe();

    dispatch(getMeSuccess(data));
  } catch (error) {
    dispatch(actionError(error));
  }
};

export const handleUpdateMe =
  (body, callback, successCallback) => async (dispatch) => {
    try {
      dispatch(updateMeRequest());

      const { data } = await updateMe(body);

      dispatch(updateMeSuccess(data));
      toast.success('Your account settings has been updated successfully!');
      successCallback && successCallback(data);
    } catch (error) {
      dispatch(actionError(error));
    } finally {
      callback && callback();
    }
  };

export const handleUpdateMyEmail =
  (body, callback, successCallback) => async (dispatch) => {
    try {
      dispatch(updateMeRequest());

      const { data, token } = await updateMyEmail(body);

      setToken(token);
      dispatch(updateMeSuccess(data));
      toast.success('Your email has been updated successfully!');
      successCallback && successCallback(data);
    } catch (error) {
      dispatch(actionError(error));
    } finally {
      callback && callback();
    }
  };

export const handleUpdateMyPassword =
  (body, callback, successCallback) => async (dispatch) => {
    try {
      dispatch(updateMeRequest());

      const { data, token } = await updateMyPassword(body);

      setToken(token);
      dispatch(updateMeSuccess(data));
      toast.success('Your password has been updated successfully!');
      successCallback && successCallback();
    } catch (error) {
      dispatch(actionError(error));
    } finally {
      callback && callback();
    }
  };

export const handleForgotPassword =
  (email, successCallback) => async (dispatch) => {
    try {
      dispatch(forgotPasswordRequest());

      const { message } = await forgotPassword(email);

      dispatch(forgotPasswordSuccess());
      toast.success(message);
      successCallback();
    } catch (error) {
      dispatch(actionError(error));
    }
  };

export const handleResetPassword =
  ({ token, password, passwordConfirm }) =>
  async (dispatch) => {
    try {
      dispatch(forgotPasswordRequest());

      const { data, token: userToken } = await resetPassword({
        token,
        password,
        passwordConfirm,
      });

      setToken(userToken);
      dispatch(signInSuccess(data));
      toast.success('You have successfully reset your password!');
      history.push(ROUTE.HOME);
    } catch (error) {
      dispatch(actionError(error));
    }
  };

export const handleGetInvitationData = (token) => async (dispatch) => {
  try {
    dispatch(getInvitationDataRequest());

    const { data } = await getInvitationData(token);

    dispatch(getInvitationDataSuccess(data));
  } catch (error) {
    dispatch(actionError(error));
  }
};

export const handleRegisterByInvite =
  ({ token, password, passwordConfirm }) =>
  async (dispatch) => {
    try {
      dispatch(signUpByInvitationRequest());

      const { data, token: userToken } = await signUpByInvitation({
        token,
        password,
        passwordConfirm,
      });

      setToken(userToken);
      dispatch(signUpByInvitationSuccess(data));
      toast.success('You have successfully registered!');
      history.push(ROUTE.HOME);
    } catch (error) {
      dispatch(actionError(error));
    }
  };

export const handleLogout = () => (dispatch) => {
  clearStorage();
  dispatch(logoutSuccess());
  history.push(ROUTE.LOGIN);
};
