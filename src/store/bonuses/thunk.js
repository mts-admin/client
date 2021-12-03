import axios from 'axios';

import {
  getMyBonuses,
  getBonus,
  getUserBonuses,
  createBonus,
  editBonus,
  deleteBonus,
} from '../../api/bonuses';
import {
  getBonusesRequest,
  getBonusesSuccess,
  manageBonusesRequest,
  manageBonusesSuccess,
  editBonusRequest,
  editBonusSuccess,
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

export const handleUserBonusesGet =
  ({ userId, params, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(getBonusesRequest());

      const { data, count } = await getUserBonuses(
        userId.id,
        params,
        cancelToken,
      );

      dispatch(getBonusesSuccess({ data, count }));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleBonusCreate =
  ({ body, userId, callback, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(manageBonusesRequest());

      await createBonus(body);

      dispatch(handleUserBonusesGet({ userId, cancelToken }));

      callback && callback(userId);
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleBonusEdit =
  ({ id, body, callback }) =>
  async (dispatch) => {
    try {
      dispatch(editBonusRequest());

      const { data } = await editBonus(id, body);

      dispatch(editBonusSuccess(data));

      callback && callback();
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };

export const handleBonusDelete =
  ({ id, userId, params, callback, cancelToken }) =>
  async (dispatch) => {
    try {
      dispatch(manageBonusesRequest());

      await deleteBonus(id);

      callback && callback();

      dispatch(handleUserBonusesGet({ userId, params, cancelToken }));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(actionError(error));
      }
    }
  };
