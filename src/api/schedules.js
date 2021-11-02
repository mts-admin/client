import apiRequest from './index';
import { endpoints } from './endpoints';

export const getSchedules = (type, page, cancelToken) =>
  apiRequest({
    method: 'GET',
    url: endpoints.schedules.schedulesByType(type),
    params: { page },
    cancelToken,
  }).then(({ data }) => data);

export const getSchedule = (id) =>
  apiRequest({
    method: 'GET',
    url: endpoints.schedules.scheduleById(id),
  }).then(({ data }) => data);

export const createSchedule = (body) =>
  apiRequest({
    method: 'POST',
    url: endpoints.schedules.schedules,
    data: body,
  }).then(({ data }) => data);

export const editSchedule = (body, id) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.schedules.scheduleById(id),
    data: body,
  }).then(({ data }) => data);

export const deleteSchedule = (id) =>
  apiRequest({
    method: 'DELETE',
    url: endpoints.schedules.scheduleById(id),
  }).then(({ data }) => data);

export const leaveSchedule = (id) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.schedules.leaveSchedule(id),
  });

export const addScheduleParticipant = (body, id) =>
  apiRequest({
    method: 'POST',
    url: endpoints.schedules.scheduleParticipants(id),
    data: body,
  }).then(({ data }) => data);

export const editScheduleParticipant = (body, id) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.schedules.scheduleParticipants(id),
    data: body,
  }).then(({ data }) => data);

export const deleteScheduleParticipant = (body, id) =>
  apiRequest({
    method: 'DELETE',
    url: endpoints.schedules.scheduleParticipants(id),
    data: body,
  }).then(({ data }) => data);
