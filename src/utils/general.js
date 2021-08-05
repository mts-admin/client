import * as R from 'ramda';

export const getErrorMessage = (error) =>
  R.pathOr('Something went wrong', ['response', 'data', 'message'], error);
