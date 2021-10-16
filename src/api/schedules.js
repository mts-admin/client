import apiRequest from './index';
import { endpoints } from './endpoints';

export const getSchedules = (type, page, cancelToken) =>
  apiRequest({
    method: 'GET',
    url: endpoints.getSchedules(type),
    params: { page },
    cancelToken,
  }).then(({ data }) => data);

export const createSchedule = (body) =>
  apiRequest({
    method: 'POST',
    url: endpoints.schedules,
    data: body,
  }).then(({ data }) => data);

export const getSchedule = (id) =>
  apiRequest({
    method: 'GET',
    url: endpoints.scheduleById(id),
  }).then(({ data }) => data);

export const deleteSchedule = (id) =>
  apiRequest({
    method: 'DELETE',
    url: endpoints.scheduleById(id),
  }).then(({ data }) => data);
