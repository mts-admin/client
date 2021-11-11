import { createAction } from 'redux-actions';

export const types = {
  GET_FINANCES: 'finances/GET_FINANCES',
  MANAGE_FINANCES: 'finances/MANAGE_FINANCES',
  EDIT_FINANCES: 'finances/EDIT_FINANCES',
  CLEAR: 'finances/CLEAR',
  ERROR: 'finances/error',
};

export const getFinancesRequest = createAction(`${types.GET_FINANCES}_REQUEST`);
export const getFinancesSuccess = createAction(`${types.GET_FINANCES}_SUCCESS`);

export const editFinancesRequest = createAction(
  `${types.EDIT_FINANCES}_REQUEST`,
);
export const editFinancesSuccess = createAction(
  `${types.EDIT_FINANCES}_SUCCESS`,
);

export const manageFinancesRequest = createAction(
  `${types.MANAGE_FINANCES}_REQUEST`,
);
export const manageFinancesSuccess = createAction(
  `${types.MANAGE_FINANCES}_SUCCESS`,
);

export const actionError = createAction(types.ERROR);

export const clearFinances = createAction(types.CLEAR);
