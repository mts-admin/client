import apiRequest from './index';
import { endpoints } from './endpoints';

export const getMyBonuses = (params, cancelToken) =>
  apiRequest({
    method: 'GET',
    url: endpoints.bonuses.bonuses,
    // viewed, search, page
    params,
    cancelToken,
  }).then(({ data }) => data);

export const getBonus = (id) =>
  apiRequest({
    method: 'GET',
    url: endpoints.bonuses.bonusById(id),
  }).then(({ data }) => data);

export const getUserBonuses = (userId, params, cancelToken) =>
  apiRequest({
    method: 'GET',
    url: endpoints.bonuses.userBonuses(userId),
    // search, page
    params,
    cancelToken,
  }).then(({ data }) => data);

export const createBonus = (body) =>
  apiRequest({
    method: 'POST',
    url: endpoints.bonuses.bonuses,
    data: body,
  }).then(({ data }) => data);

export const editBonus = (id, body) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.bonuses.bonusById(id),
    data: body,
  }).then(({ data }) => data);

export const deleteBonus = (id) =>
  apiRequest({
    method: 'DELETE',
    url: endpoints.bonuses.bonusById(id),
  }).then(({ data }) => data);
