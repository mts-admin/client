export const selectSprint = (state, id) => state.sprints.items.byId[id] || {};

export const selectCurrentSprint = (state) => state.sprints.currentItem;

export const selectSprints = (state) => state.sprints.items.allIds;

export const selectSprintsTotalCount = (state) => state.sprints.totalCount;

export const selectSprintsLoading = (state) => state.sprints.loading;

export const selectSprintsInitLoading = (state) => state.sprints.initLoading;

export const selectSprintsError = (state) => state.sprints.error;
