import * as R from 'ramda';
import { combineActions, handleActions } from 'redux-actions';

import { arrayToObject } from '../../utils/general';

import {
  getNotesRequest,
  getNotesSuccess,
  editNoteRequest,
  editNoteSuccess,
  manageNotesRequest,
  manageNotesSuccess,
  actionError,
  clearNotes,
} from './actions';

const initialState = {
  items: {
    byId: {},
    allIds: [],
  },
  totalCount: 0,
  currentItem: {},
  loading: false,
  initLoading: false,
  error: null,
};

const getNotesSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  items: {
    byId: arrayToObject(payload.data),
    allIds: payload.data.map(({ _id }) => _id),
  },
  totalCount: payload.count,
});

const editNoteSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  items: {
    byId: {
      ...state.items.byId,
      [payload._id]: payload,
    },
    allIds: state.items.allIds,
  },
});

const manageNotesSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  currentItem: payload || {},
});

const errorReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: payload,
});

const clearNotesReducer = () => initialState;

const notesReducer = handleActions(
  {
    [combineActions(getNotesRequest, editNoteRequest)]: R.mergeDeepLeft({
      initLoading: true,
    }),
    [manageNotesRequest]: R.mergeDeepLeft({
      loading: true,
    }),
    [getNotesSuccess]: getNotesSuccessReducer,
    [editNoteSuccess]: editNoteSuccessReducer,
    [manageNotesSuccess]: manageNotesSuccessReducer,
    [actionError]: errorReducer,
    [clearNotes]: clearNotesReducer,
  },
  initialState,
);

export default notesReducer;
