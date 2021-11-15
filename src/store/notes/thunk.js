import axios from 'axios';
import { toast } from 'react-toastify';

import history from '../history';
import {
  getNotes,
  getNote,
  createNote,
  editNote,
  deleteNote,
} from '../../api/notes';
import {
  getNotesRequest,
  getNotesSuccess,
  editNoteRequest,
  editNoteSuccess,
  manageNotesRequest,
  manageNotesSuccess,
  actionError,
} from './actions';
import { DYNAMIC_ROUTE, ROUTE } from '../../routes/constants';

export const handleNotesGet =
  ({ params, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(getNotesRequest());

      const { data, count } = await getNotes(params, cancelToken);

      dispatch(getNotesSuccess({ data, count }));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleNoteCreate = (body) => async (dispatch) => {
  try {
    dispatch(manageNotesRequest());

    const { data } = await createNote(body);

    dispatch(manageNotesSuccess());

    history.push(DYNAMIC_ROUTE.NOTE(data._id));

    toast.success('Note has been created successfully!');
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};

export const handleNoteUpdate = (id, body) => async (dispatch) => {
  try {
    dispatch(manageNotesRequest());

    const { data } = await editNote(id, body);

    dispatch(manageNotesSuccess(data));

    history.push(DYNAMIC_ROUTE.NOTE(data._id));

    toast.success('Note has been updated successfully!');
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};

export const handleNoteEdit = (id, body) => async (dispatch) => {
  try {
    dispatch(editNoteRequest());

    const { data } = await editNote(id, body);

    dispatch(editNoteSuccess(data));

    toast.success('Note has been updated successfully!');
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};

export const handleNoteGet = (id) => async (dispatch) => {
  try {
    dispatch(manageNotesRequest());

    const { data } = await getNote(id);

    dispatch(manageNotesSuccess(data));
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};

export const handleNoteDelete = (id) => async (dispatch) => {
  try {
    dispatch(manageNotesRequest());

    await deleteNote(id);

    dispatch(manageNotesSuccess());

    history.push(ROUTE.NOTES);

    toast.success('Note has been deleted successfully!');
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};
