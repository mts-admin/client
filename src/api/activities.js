import apiRequest from './index';
import { endpoints } from './endpoints';

export const getMyActivities = (params, cancelToken) =>
  apiRequest({
    method: 'GET',
    url: endpoints.activities.activities,
    // viewed, search, page, status
    params,
    cancelToken,
  }).then(({ data }) => data);

export const getUserActivities = (userId, params, cancelToken) =>
  apiRequest({
    method: 'GET',
    url: endpoints.activities.userActivities(userId),
    // search, page, status
    params,
    cancelToken,
  }).then(({ data }) => data);

export const getActivity = (id) =>
  apiRequest({
    method: 'GET',
    url: endpoints.activities.activityById(id),
  }).then(({ data }) => data);

export const createActivity = (body) =>
  apiRequest({
    method: 'POST',
    url: endpoints.activities.activities,
    data: body,
  }).then(({ data }) => data);

export const editActivity = (id, body) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.activities.activityById(id),
    data: body,
  }).then(({ data }) => data);

export const editActivityStatus = (id, body) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.activities.activityStatus(id),
    data: body,
  }).then(({ data }) => data);

export const deleteUserActivity = (id) =>
  apiRequest({
    method: 'DELETE',
    url: endpoints.activities.activityById(id),
  }).then(({ data }) => data);
