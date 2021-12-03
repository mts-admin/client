import axios from 'axios';
import * as R from 'ramda';
import { toast } from 'react-toastify';

import config from '../config';
import history from '../store/history';
import { clearStorage } from '../utils/local-storage';
import { getErrorMessage } from '../utils/general';
import { ROUTE } from '../routes/constants';
import { HTTP_CODE } from '../constants/http-codes';
import { isFreeEndpoint, getAuthHeader } from './helpers';

const DEFAULT_TIMEOUT = 10000;

const api = axios.create({
  baseURL: config.apiUrl,
  timeout: DEFAULT_TIMEOUT,
});

const onSuccess = (response) => response;

const onFail = (err) => {
  if (!axios.isCancel(err)) {
    toast.error(getErrorMessage(err));
  }

  if (R.path(['response', 'status'], err) === HTTP_CODE.UNAUTHORIZED) {
    clearStorage();
    history.push(ROUTE.LOGIN);
  }

  if (R.path(['response', 'status'], err) === HTTP_CODE.SERVER_ERROR) {
    history.push(ROUTE.ERROR);
  }

  return Promise.reject(err);
};

// interceptors for server errros
api.interceptors.response.use(onSuccess, onFail);

// Apply JWT token to request dynamically
api.interceptors.request.use((configs) =>
  R.ifElse(
    R.compose(isFreeEndpoint, R.prop('url')),
    R.identity,
    R.mergeDeepLeft({ headers: getAuthHeader() }),
  )(configs),
);

export default api;
