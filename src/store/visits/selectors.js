import { createSelector } from 'reselect';

export const selectCurrentVisit = (state) => state.visits.currentItem;

export const selectVisitsLoading = (state) => state.visits.loading;
export const selectVisitsInitLoading = (state) => state.visits.initLoading;

export const selectVisitsError = (state) => state.visits.error;

export const makeSelectVisits = () =>
  createSelector(
    (state) => state.visits.items,
    (visits) =>
      visits.map((visit) => ({
        id: visit._id,
        scheduleId: visit.scheduleId,
        title: visit.title,
        start: visit.startTime,
        end: visit.endTime,
        status: visit.status,
        recurring: visit.recurring,
      })),
  );
