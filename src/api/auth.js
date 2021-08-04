import apiRequest from './index';
import endpoints from './endpoints';

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

export const getMe = () =>
  apiRequest({
    method: 'GET',
    url: endpoints.getMe,
  }).then(({ data }) => data);
