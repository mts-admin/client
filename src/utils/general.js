import * as R from 'ramda';

import config from '../config';

export const getErrorMessage = (error) =>
  R.pathOr('Something went wrong', ['response', 'data', 'message'], error);

export const getImageUrl = (url, type = 'user') => {
  const defaultImage = {
    bonus: '/img/gift.svg',
    user: '/img/default-avatar.svg',
  };

  // TODO: refactor when image uploads will be done on server
  const imageUrl = url ? `${config.apiUrl}${url}` : null;

  // return url || defaultImage[type];
  return imageUrl || defaultImage[type];
};

export const getPaginationPagesCount = (totalItemsCount, minItemsCount) => {
  if (totalItemsCount === 0) return 1;

  return Math.ceil(totalItemsCount / minItemsCount);
};

export const arrayToObject = (array, key = '_id') =>
  R.reduce((acc, x) => R.assoc(x[key], x, acc), {})(array);
