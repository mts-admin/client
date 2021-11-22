import * as R from 'ramda';

import { BONUSES_TYPE_VALUE } from '../../constants/bonuses';

export const getViewedSortFilter = (type) =>
  R.cond([
    [R.equals(BONUSES_TYPE_VALUE.SHOW_ALL.value), () => ({})],
    [R.equals(BONUSES_TYPE_VALUE.SHOW_VIEWED.value), () => ({ viewed: true })],
    [
      R.equals(BONUSES_TYPE_VALUE.SHOW_UNVIEWED.value),
      () => ({ viewed: false }),
    ],
  ])(type);
