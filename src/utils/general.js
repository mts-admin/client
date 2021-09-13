import * as R from 'ramda';

export const getErrorMessage = (error) =>
  R.pathOr('Something went wrong', ['response', 'data', 'message'], error);

export const getUserAvatar = (url) => url || '/img/default-avatar.svg';

export const getPaginationPagesCount = (itemsCount, minItemsCount) => {
  if (itemsCount === 0) return 1;

  return Math.ceil(itemsCount / minItemsCount);
};

export const arrayToObject = (array, key = '_id') =>
  R.reduce((acc, x) => R.assoc(x[key], x, acc), {})(array);
