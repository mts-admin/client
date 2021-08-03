import * as R from 'ramda';

export const getErrorMessage = (error) =>
  R.path(['response', 'data', 'message'], error);
