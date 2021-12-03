import { createAction } from 'redux-actions';

export const types = {
  GET_SPRINTS: 'sprints/GET_SPRINTS',
  MANAGE_SPRINTS: 'sprints/MANAGE_SPRINTS',
  CLEAR: 'sprints/CLEAR',
  ERROR: 'sprints/error',
};

export const getSprintsRequest = createAction(`${types.GET_SPRINTS}_REQUEST`);
export const getSprintsSuccess = createAction(`${types.GET_SPRINTS}_SUCCESS`);

export const manageSprintsRequest = createAction(
  `${types.MANAGE_SPRINTS}_REQUEST`,
);
export const manageSprintsSuccess = createAction(
  `${types.MANAGE_SPRINTS}_SUCCESS`,
);

export const actionError = createAction(types.ERROR);

export const clearSprints = createAction(types.CLEAR);
