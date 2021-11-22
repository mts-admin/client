import axios from 'axios';

import { getMyBonuses, getBonus } from '../../api/bonuses';
import {
  getBonusesRequest,
  getBonusesSuccess,
  manageBonusesRequest,
  manageBonusesSuccess,
  getMyBonusRequest,
  getMyBonusSuccess,
  actionError,
} from './actions';
import { clearNavigationBadge } from '../auth/actions';

export const handleMyBonusesGet =
  ({ params, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(getBonusesRequest());

      const { data, count } = await getMyBonuses(params, cancelToken);

      dispatch(getBonusesSuccess({ data, count }));
      dispatch(clearNavigationBadge('newBonusesCount'));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleBonusGet = (id) => async (dispatch) => {
  try {
    dispatch(manageBonusesRequest());

    const { data } = await getBonus(id);

    dispatch(manageBonusesSuccess(data));
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};

export const handleMyBonusGet = (id) => async (dispatch) => {
  try {
    dispatch(getMyBonusRequest());

    const { data } = await getBonus(id);

    dispatch(getMyBonusSuccess(data));
  } catch (error) {
    if (!axios.isCancel(error)) {
      dispatch(actionError(error));
    }
  }
};
