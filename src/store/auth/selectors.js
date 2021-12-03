export const selectAuthLoading = (state) => state.auth.loading;

export const selectAuthUser = (state) => state.auth.user;

export const selectAuthUserRole = (state) => state.auth.user.role;

export const selectAuthUserNewBonusesCount = (state) =>
  state.auth.user.newBonusesCount;

export const selectAuthUserNewActivitiesCount = (state) =>
  state.auth.user.newActivitiesCount;

export const selectInitLoading = (state) => state.auth.initLoading;

export const selectInvitationLoading = (state) => state.auth.invitationLoading;

export const selectAuthError = (state) => state.auth.error;
