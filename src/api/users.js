import apiRequest from './index';
import { endpoints } from './endpoints';

export const getUsers = (params, cancelToken) =>
  apiRequest({
    method: 'GET',
    url: endpoints.users.users,
    // page, sort, search, status, role
    params,
    cancelToken,
  }).then(({ data }) => data);

export const getUser = (id) =>
  apiRequest({
    method: 'GET',
    url: endpoints.users.userById(id),
  }).then(({ data }) => data);

export const editUser = (id, body) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.users.userById(id),
    data: body,
  }).then(({ data }) => data);

export const inviteUser = (body) =>
  apiRequest({
    method: 'POST',
    url: endpoints.users.invitation,
    data: body,
  }).then(({ data }) => data);

export const cancelInvitation = (token) =>
  apiRequest({
    method: 'DELETE',
    url: endpoints.users.invitationById(token),
  }).then(({ data }) => data);
