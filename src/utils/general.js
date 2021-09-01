import * as R from 'ramda';

export const getErrorMessage = (error) =>
  R.pathOr('Something went wrong', ['response', 'data', 'message'], error);

export const getUserAvatar = (url) => url || '/img/default-avatar.svg';
