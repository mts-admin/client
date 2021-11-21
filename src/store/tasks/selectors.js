export const selectTask = (state, id) => state.tasks.items.byId[id] || {};

export const selectTasks = (state) => state.tasks.items.allIds;

export const selectTasksLoading = (state) => state.tasks.loading;

export const selectTasksInitLoading = (state) => state.tasks.initLoading;

export const selectTasksError = (state) => state.tasks.error;
