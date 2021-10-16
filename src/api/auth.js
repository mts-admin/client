import apiRequest from './index';
import { endpoints } from './endpoints';

export const getMe = () =>
  apiRequest({
    method: 'GET',
    url: endpoints.getMe,
  }).then(({ data }) => data);

export const loginRequest = ({ email, password }) =>
  apiRequest({
    method: 'POST',
    url: endpoints.login,
    data: { email, password },
  }).then((result) => result?.data);

export const forgotPassword = (email) =>
  apiRequest({
    method: 'POST',
    url: endpoints.forgotPassword,
    data: { email },
  }).then(({ data }) => data);

export const resetPassword = ({ token, password, passwordConfirm }) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.resetPassword(token),
    data: { password, passwordConfirm },
  }).then(({ data }) => data);

export const getInvitationData = (token) =>
  apiRequest({
    method: 'GET',
    url: endpoints.register(token),
  }).then(({ data }) => data);

export const signUpByInvitation = ({ token, password, passwordConfirm }) =>
  apiRequest({
    method: 'POST',
    url: endpoints.register(token),
    data: { password, passwordConfirm },
  }).then(({ data }) => data);
