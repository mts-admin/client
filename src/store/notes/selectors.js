export const selectNote = (state, id) => state.notes.items.byId[id] || {};

export const selectCurrentNote = (state) => state.notes.currentItem;

export const selectNotes = (state) => state.notes.items.allIds;

export const selectNotesTotalCount = (state) => state.notes.totalCount;

export const selectNotesLoading = (state) => state.notes.loading;

export const selectNotesInitLoading = (state) => state.notes.initLoading;

export const selectNotesError = (state) => state.notes.error;
