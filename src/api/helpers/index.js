import { noAuthEndpoints } from '../endpoints';
import { getToken } from '../../utils/local-storage';

export const isFreeEndpoint = (url) =>
  noAuthEndpoints.some((elem) => url.includes(elem));

export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
