import { createSelector } from 'reselect';

export const selectBonus = (state, id) => state.bonuses.items.byId[id] || {};

export const selectBonuses = (state) => state.bonuses.items.allIds;

export const selectBonusesTotalCount = (state, id) => state.bonuses.totalCount;

export const selectBonusCurrentItem = (state, id) => state.bonuses.currentItem;

export const selectBonusesLoading = (state) => state.bonuses.loading;

export const selectBonusesInitLoading = (state) => state.bonuses.initLoading;

export const selectBonusesError = (state) => state.bonuses.error;

export const makeSelectBonuses = () =>
  createSelector(
    (state) => state.bonuses.items.allIds,
    (state) => state.bonuses.items.byId,
    (allIds, byId) => allIds.map((id) => byId[id]),
  );
