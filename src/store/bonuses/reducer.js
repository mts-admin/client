import * as R from 'ramda';
import { combineActions, handleActions } from 'redux-actions';

import { arrayToObject } from '../../utils/general';

import {
  getBonusesRequest,
  getBonusesSuccess,
  manageBonusesRequest,
  manageBonusesSuccess,
  getMyBonusRequest,
  getMyBonusSuccess,
  actionError,
  clearBonuses,
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

const getBonusesSuccessReducer = (state, { payload }) => ({
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

const getMyBonusSuccessReducer = (state, { payload }) => ({
  ...state,
  loading: false,
  initLoading: false,
  error: null,
  currentItem: payload,
  items: {
    allIds: state.items.allIds,
    byId: {
      ...state.items.byId,
      [payload._id]: payload,
    },
  },
});

const manageBonusesSuccessReducer = (state, { payload }) => ({
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

const clearBonusesReducer = () => initialState;

const bonusesReducer = handleActions(
  {
    [getBonusesRequest]: R.mergeDeepLeft({ initLoading: true }),
    [combineActions(manageBonusesRequest, getMyBonusRequest)]: R.mergeDeepLeft({
      loading: true,
    }),
    [getBonusesSuccess]: getBonusesSuccessReducer,
    [manageBonusesSuccess]: manageBonusesSuccessReducer,
    [getMyBonusSuccess]: getMyBonusSuccessReducer,
    [actionError]: errorReducer,
    [clearBonuses]: clearBonusesReducer,
  },
  initialState,
);

export default bonusesReducer;
