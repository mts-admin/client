import { createAction } from 'redux-actions';

export const types = {
  GET_TASKS: 'tasks/GET_TASKS',
  CREATE_TASK: 'tasks/CREATE_TASK',
  EDIT_TASK: 'tasks/EDIT_TASK',
  DELETE_TASK: 'tasks/DELETE_TASK',
  CLEAR: 'tasks/CLEAR',
  ERROR: 'tasks/error',
};

export const getTasksRequest = createAction(`${types.GET_TASKS}_REQUEST`);
export const getTasksSuccess = createAction(`${types.GET_TASKS}_SUCCESS`);

export const createTaskRequest = createAction(`${types.CREATE_TASK}_REQUEST`);
export const createTaskSuccess = createAction(`${types.CREATE_TASK}_SUCCESS`);

export const editTaskRequest = createAction(`${types.EDIT_TASK}_REQUEST`);
export const editTaskSuccess = createAction(`${types.EDIT_TASK}_SUCCESS`);

export const deleteTaskRequest = createAction(`${types.DELETE_TASK}_REQUEST`);
export const deleteTaskSuccess = createAction(`${types.DELETE_TASK}_SUCCESS`);

export const actionError = createAction(types.ERROR);

export const clearTasks = createAction(types.CLEAR);
