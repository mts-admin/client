import { DateTime } from 'luxon';

const DEFAULT_PAGE = 1;

const ACTION_TYPE = {
  CHANGE_TABLE: 'CHANGE_TABLE',
  CHANGE_FILTERS: 'CHANGE_FILTERS',
};

export const initialState = {
  page: DEFAULT_PAGE,
  order: 'desc',
  orderBy: 'date',
  search: '',
  start: DateTime.now().startOf('month').toString(),
  end: DateTime.now().endOf('month').toString(),
};

export const changeFilters = (payload) => ({
  type: ACTION_TYPE.CHANGE_FILTERS,
  payload,
});
export const changeTabel = (payload) => ({
  type: ACTION_TYPE.CHANGE_TABLE,
  payload,
});

export const stateReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.CHANGE_TABLE:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION_TYPE.CHANGE_FILTERS:
      return {
        ...initialState,
        ...action.payload,
      };
    default:
      return state;
  }
};
