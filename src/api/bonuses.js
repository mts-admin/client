import apiRequest from './index';
import { endpoints } from './endpoints';

export const getMyBonuses = (params, cancelToken) =>
  apiRequest({
    method: 'GET',
    url: endpoints.bonuses.myBonuses,
    // viewed
    params,
    cancelToken,
  }).then(({ data }) => data);

export const getBonus = (id) =>
  apiRequest({
    method: 'GET',
    url: endpoints.bonuses.bonusById(id),
  }).then(({ data }) => data);
