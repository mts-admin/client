import { createSelector } from 'reselect';

export const selectFinanceCurrentItem = (state) => state.finances.currentItem;

export const selectFinancesTotalCount = (state) => state.finances.totalCount;

export const selectFinancesStatistics = (state) => state.finances.statistics;

export const selectFinancesInitLoading = (state) => state.finances.initLoading;
export const selectFinancesLoading = (state) => state.finances.loading;

export const selectFinancesError = (state) => state.finances.error;

export const makeSelectFinances = () =>
  createSelector(
    (state) => state.finances.items.allIds,
    (state) => state.finances.items.byId,
    (allIds, byId) => allIds.map((id) => byId[id]),
  );
