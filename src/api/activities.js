import apiRequest from './index';
import { endpoints } from './endpoints';

export const getMyActivities = (params, cancelToken) =>
  apiRequest({
    method: 'GET',
    url: endpoints.activities.myActivities,
    // viewed, search, page, status
    params,
    cancelToken,
  }).then(({ data }) => data);

export const getActivity = (id) =>
  apiRequest({
    method: 'GET',
    url: endpoints.activities.activityById(id),
  }).then(({ data }) => data);
