import { createAction } from 'redux-actions';

export const types = {
  GET_NOTES: 'notes/GET_NOTES',
  EDIT_NOTE: 'notes/EDIT_NOTE',
  MANAGE_NOTES: 'notes/MANAGE_NOTES',
  CLEAR: 'notes/CLEAR',
  ERROR: 'notes/error',
};

export const getNotesRequest = createAction(`${types.GET_NOTES}_REQUEST`);
export const getNotesSuccess = createAction(`${types.GET_NOTES}_SUCCESS`);

export const editNoteRequest = createAction(`${types.EDIT_NOTE}_REQUEST`);
export const editNoteSuccess = createAction(`${types.EDIT_NOTE}_SUCCESS`);

export const manageNotesRequest = createAction(`${types.MANAGE_NOTES}_REQUEST`);
export const manageNotesSuccess = createAction(`${types.MANAGE_NOTES}_SUCCESS`);

export const actionError = createAction(types.ERROR);

export const clearNotes = createAction(types.CLEAR);
