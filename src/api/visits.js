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

export const getVisit = (scheduleId, visitId) =>
  apiRequest({
    method: 'GET',
    url: endpoints.schedules.scheduleVisitById(scheduleId, visitId),
  }).then(({ data }) => data);

export const editVisit = (scheduleId, visitId, body) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.schedules.scheduleVisitById(scheduleId, visitId),
    data: body,
  }).then(({ data }) => data);

export const editAllVisits = (scheduleId, visitId, body) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.schedules.scheduleVisitsGroup(scheduleId, visitId),
    data: body,
  }).then(({ data }) => data);

export const deleteVisit = (scheduleId, visitId) =>
  apiRequest({
    method: 'DELETE',
    url: endpoints.schedules.scheduleVisitById(scheduleId, visitId),
  }).then(({ data }) => data);

export const deleteAllVisits = (scheduleId, visitId) =>
  apiRequest({
    method: 'DELETE',
    url: endpoints.schedules.scheduleVisitsGroup(scheduleId, visitId),
  }).then(({ data }) => data);
