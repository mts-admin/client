import axios from 'axios';

import config from '../config';
import history from '../store/history';
import { getToken, clearStorage } from '../utils/local-storage';
import { ROUTE } from '../routes/constants';
import { HTTP_CODE } from '../constants/http-codes';

const DEFAULT_TIMEOUT = 5000;

const createAPI = () => {
  const token = getToken();

  const api = axios.create({
    baseURL: config.apiUrl,
    timeout: DEFAULT_TIMEOUT,
    headers: { Authorization: `Bearer ${token}` },
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.status === HTTP_CODE.UNAUTHORIZED) {
      clearStorage();
      history.push(ROUTE.LOGIN);
    }

    if (err.response.status === HTTP_CODE.SERVER_ERROR) {
      history.push(ROUTE.ERROR);
    }

    return Promise.reject(err);
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

const api = createAPI();

export default api;
