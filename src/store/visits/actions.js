import { createAction } from 'redux-actions';

export const types = {
  GET_VISITS: 'visits/GET_VISITS',
  GET_VISIT: 'visits/GET_VISIT',
  MANAGE_VISITS: 'visits/MANAGE_VISITS',
  CLEAR: 'visits/CLEAR',
  ERROR: 'visits/error',
};

export const getVisitsRequest = createAction(`${types.GET_VISITS}_REQUEST`);
export const getVisitsSuccess = createAction(`${types.GET_VISITS}_SUCCESS`);

export const manageVisitsRequest = createAction(
  `${types.MANAGE_VISITS}_REQUEST`,
);

export const getVisitRequest = createAction(`${types.GET_VISIT}_REQUEST`);
export const getVisitSuccess = createAction(`${types.GET_VISIT}_SUCCESS`);

export const actionError = createAction(types.ERROR);
export const clearVisits = createAction(types.CLEAR);
