import { createSelector } from 'reselect';

export const selectUserCurrentItem = (state) => state.users.currentItem;

export const selectUsersTotalCount = (state) => state.users.totalCount;

export const selectUsersInitLoading = (state) => state.users.initLoading;
export const selectUsersLoading = (state) => state.users.loading;

export const selectUsersError = (state) => state.users.error;

export const makeSelectUsers = () =>
  createSelector(
    (state) => state.users.items.allIds,
    (state) => state.users.items.byId,
    (allIds, byId) => allIds.map((id) => byId[id]),
  );
