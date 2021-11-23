export const selectActivity = (state, id) =>
  state.activities.items.byId[id] || {};

export const selectActivities = (state) => state.activities.items.allIds;

export const selectActivitiesTotalCount = (state, id) =>
  state.activities.totalCount;

export const selectActivitiesRestCount = (state, id) =>
  state.activities.restCount;

export const selectActivityCurrentItem = (state, id) =>
  state.activities.currentItem;

export const selectActivitiesLoading = (state) => state.activities.loading;

export const selectActivitiesInitLoading = (state) =>
  state.activities.initLoading;

export const selectActivitiesError = (state) => state.activities.error;
