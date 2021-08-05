import { toast } from 'react-toastify';

import history from '../history';
import {
  getMe,
  loginRequest,
  forgotPassword,
  resetPassword,
  getInvitationData,
  signUpByInvitation,
} from '../../api/auth';
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
import { getErrorMessage } from '../../utils/general';
import { setToken } from '../../utils/local-storage';
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
      toast.error(getErrorMessage(error));
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

export const handleForgotPassword =
  (email, successCallback) => async (dispatch) => {
    try {
      dispatch(forgotPasswordRequest());

      const { message } = await forgotPassword(email);

      dispatch(forgotPasswordSuccess());
      toast.success(message);
      successCallback();
    } catch (error) {
      toast.error(getErrorMessage(error));
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
      toast.error(getErrorMessage(error));
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
    toast.error(getErrorMessage(error));
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
      toast.error(getErrorMessage(error));
      dispatch(actionError(error));
    }
  };
