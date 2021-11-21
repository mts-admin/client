import apiRequest from './index';
import { endpoints } from './endpoints';

export const getTasks = (sprintId) =>
  apiRequest({
    method: 'GET',
    url: endpoints.tasks.tasks(sprintId),
  }).then(({ data }) => data);

export const createTask = (body, sprintId) =>
  apiRequest({
    method: 'POST',
    url: endpoints.tasks.tasks(sprintId),
    data: body,
  }).then(({ data }) => data);

export const editTask = ({ sprintId, taskId, body, cancelToken }) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.tasks.taskById(sprintId, taskId),
    data: body,
    cancelToken,
  }).then(({ data }) => data);

export const deleteTask = (sprintId, taskId) =>
  apiRequest({
    method: 'DELETE',
    url: endpoints.tasks.taskById(sprintId, taskId),
  }).then(({ data }) => data);
