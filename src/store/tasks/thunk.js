import axios from 'axios';

import { getTasks, createTask, editTask, deleteTask } from '../../api/tasks';
import {
  getTasksRequest,
  getTasksSuccess,
  createTaskRequest,
  createTaskSuccess,
  editTaskRequest,
  editTaskSuccess,
  deleteTaskRequest,
  deleteTaskSuccess,
  actionError,
} from './actions';

export const handleTasksGet = (sprintId) => async (dispatch) => {
  try {
    dispatch(getTasksRequest());

    const { data } = await getTasks(sprintId);

    dispatch(getTasksSuccess(data));
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};

export const handleTaskCreate =
  (body, sprintId, callback) => async (dispatch) => {
    try {
      dispatch(createTaskRequest());

      const { data } = await createTask(body, sprintId);

      dispatch(createTaskSuccess(data));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    } finally {
      callback && callback();
    }
  };

export const handleTaskEdit =
  ({ sprintId, taskId, body, cancelToken, callback }) =>
  async (dispatch) => {
    try {
      dispatch(editTaskRequest());

      const { data } = await editTask({ sprintId, taskId, body, cancelToken });

      dispatch(editTaskSuccess(data));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    } finally {
      callback && callback();
    }
  };

export const handleTaskDelete =
  ({ sprintId, taskId, callback }) =>
  async (dispatch) => {
    try {
      dispatch(deleteTaskRequest());

      await deleteTask(sprintId, taskId);

      dispatch(deleteTaskSuccess({ taskId }));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    } finally {
      callback && callback();
    }
  };
