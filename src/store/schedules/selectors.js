export const selectSchedule = (state, id) =>
  state.schedules.items.byId[id] || {};

export const selectCurrentSchedule = (state, id) => state.schedules.current;

export const selectSchedules = (state) => state.schedules.items.allIds;

export const selectSchedulesTotalCount = (state) => state.schedules.totalCount;

export const selectSchedulesLoading = (state) => state.schedules.loading;

export const selectSchedulesError = (state) => state.schedules.error;