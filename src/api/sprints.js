import apiRequest from './index';
import { endpoints } from './endpoints';

export const getSprints = (params, cancelToken) =>
  apiRequest({
    method: 'GET',
    url: endpoints.sprints.sprints,
    // page, sort, status
    params,
    cancelToken,
  }).then(({ data }) => data);

export const getSprint = (id) =>
  apiRequest({
    method: 'GET',
    url: endpoints.sprints.sprintById(id),
  }).then(({ data }) => data);

export const createSprint = (body) =>
  apiRequest({
    method: 'POST',
    url: endpoints.sprints.sprints,
    data: body,
  }).then(({ data }) => data);

export const editSprint = (id, body) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.sprints.sprintById(id),
    data: body,
  }).then(({ data }) => data);

export const completeSprint = (id) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.sprints.completeSprint(id),
  }).then(({ data }) => data);

export const deleteSprint = (id) =>
  apiRequest({
    method: 'DELETE',
    url: endpoints.sprints.sprintById(id),
  }).then(({ data }) => data);
