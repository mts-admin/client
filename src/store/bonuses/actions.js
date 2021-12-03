import { createAction } from 'redux-actions';

export const types = {
  GET_BONUSES: 'bonuses/GET_BONUSES',
  MANAGE_BONUSES: 'bonuses/MANAGE_BONUSES',
  GET_MY_BONUS: 'bonuses/GET_MY_BONUS',
  EDIT_BONUS: 'bonuses/EDIT_BONUS',
  CLEAR: 'bonuses/CLEAR',
  ERROR: 'bonuses/error',
};

export const getBonusesRequest = createAction(`${types.GET_BONUSES}_REQUEST`);
export const getBonusesSuccess = createAction(`${types.GET_BONUSES}_SUCCESS`);

export const manageBonusesRequest = createAction(
  `${types.MANAGE_BONUSES}_REQUEST`,
);
export const manageBonusesSuccess = createAction(
  `${types.MANAGE_BONUSES}_SUCCESS`,
);

export const editBonusRequest = createAction(`${types.EDIT_BONUS}_REQUEST`);
export const editBonusSuccess = createAction(`${types.EDIT_BONUS}_SUCCESS`);

export const getMyBonusRequest = createAction(`${types.GET_MY_BONUS}_REQUEST`);
export const getMyBonusSuccess = createAction(`${types.GET_MY_BONUS}_SUCCESS`);

export const actionError = createAction(types.ERROR);

export const clearBonuses = createAction(types.CLEAR);
