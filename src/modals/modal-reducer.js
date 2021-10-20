import * as R from 'ramda';
import { createActions, handleActions } from 'redux-actions';

export const { openModal, closeCurrentModal } = createActions(
  'OPEN_MODAL',
  'CLOSE_CURRENT_MODAL',
);

export const selectModalName = (state) => state.modals.name;
export const selectModalPayload = (state) => state.modals.payload;

const initialState = { name: '', payload: {} };

export const modalReducer = handleActions(
  {
    [openModal]: (_, { payload }) => payload,
    [closeCurrentModal]: R.always(initialState),
  },
  initialState,
);
