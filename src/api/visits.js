import apiRequest from './index';
import { endpoints } from './endpoints';

export const getVisits = ({ id, params, cancelToken }) =>
  apiRequest({
    method: 'GET',
    url: endpoints.schedules.scheduleVisits(id),
    // start, end
    params,
    cancelToken,
  }).then(({ data }) => data);

export const createOneOffVisit = (id, body) =>
  apiRequest({
    method: 'POST',
    url: endpoints.schedules.scheduleOneOffVisit(id),
    data: body,
  }).then(({ data }) => data);

export const createRecurringVisits = (id, body) =>
  apiRequest({
    method: 'POST',
    url: endpoints.schedules.scheduleRecurringVisits(id),
    data: body,
  }).then(({ data }) => data);
