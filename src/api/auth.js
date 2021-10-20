import apiRequest from './index';
import { endpoints } from './endpoints';

export const getMe = () =>
  apiRequest({
    method: 'GET',
    url: endpoints.auth.getMe,
  }).then(({ data }) => data);

export const loginRequest = ({ email, password }) =>
  apiRequest({
    method: 'POST',
    url: endpoints.auth.login,
    data: { email, password },
  }).then((result) => result?.data);

export const forgotPassword = (email) =>
  apiRequest({
    method: 'POST',
    url: endpoints.auth.forgotPassword,
    data: { email },
  }).then(({ data }) => data);

export const resetPassword = ({ token, password, passwordConfirm }) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.auth.resetPassword(token),
    data: { password, passwordConfirm },
  }).then(({ data }) => data);

export const getInvitationData = (token) =>
  apiRequest({
    method: 'GET',
    url: endpoints.auth.register(token),
  }).then(({ data }) => data);

export const signUpByInvitation = ({ token, password, passwordConfirm }) =>
  apiRequest({
    method: 'POST',
    url: endpoints.auth.register(token),
    data: { password, passwordConfirm },
  }).then(({ data }) => data);
