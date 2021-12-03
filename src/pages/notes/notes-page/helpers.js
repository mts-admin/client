import * as R from 'ramda';

import { NOTES_TYPE_VALUE } from '../../../constants/notes';

export const getFavoriteFilter = (type) =>
  R.cond([
    [R.equals(NOTES_TYPE_VALUE.SHOW_ALL.value), () => ({})],
    [
      R.equals(NOTES_TYPE_VALUE.SHOW_FAVORITE.value),
      () => ({ favorite: true }),
    ],
    [R.equals(NOTES_TYPE_VALUE.SHOW_SIMPLE.value), () => ({ favorite: false })],
  ])(type);
