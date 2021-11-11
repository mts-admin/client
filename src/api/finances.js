import apiRequest from './index';
import { endpoints } from './endpoints';

export const getFinances = (params, cancelToken) =>
  apiRequest({
    method: 'GET',
    url: endpoints.finances.financesList,
    // page, sort, search, start, end
    params,
    cancelToken,
  }).then(({ data }) => data);

export const getFinance = (id) =>
  apiRequest({
    method: 'GET',
    url: endpoints.finances.financeById(id),
  }).then(({ data }) => data);

export const createFinance = (body) =>
  apiRequest({
    method: 'POST',
    url: endpoints.finances.financesList,
    data: body,
  }).then(({ data }) => data);

export const editFinance = (id, body) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.finances.financeById(id),
    data: body,
  }).then(({ data }) => data);

export const deleteFinance = (id) =>
  apiRequest({
    method: 'DELETE',
    url: endpoints.finances.financeById(id),
  }).then(({ data }) => data);
