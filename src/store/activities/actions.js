import { createAction } from 'redux-actions';

export const types = {
  GET_ACTIVITIES: 'activities/GET_ACTIVITIES',
  MANAGE_ACTIVITIES: 'activities/MANAGE_ACTIVITIES',
  GET_MY_ACTIVITY: 'activities/GET_MY_ACTIVITY',
  CLEAR: 'activities/CLEAR',
  ERROR: 'activities/error',
};

export const getActivitiesRequest = createAction(
  `${types.GET_ACTIVITIES}_REQUEST`,
);
export const getActivitiesSuccess = createAction(
  `${types.GET_ACTIVITIES}_SUCCESS`,
);

export const manageActivitiesRequest = createAction(
  `${types.MANAGE_ACTIVITIES}_REQUEST`,
);
export const manageActivitiesSuccess = createAction(
  `${types.MANAGE_ACTIVITIES}_SUCCESS`,
);

export const getMyActivityRequest = createAction(
  `${types.GET_MY_ACTIVITY}_REQUEST`,
);
export const getMyActivitySuccess = createAction(
  `${types.GET_MY_ACTIVITY}_SUCCESS`,
);

export const actionError = createAction(types.ERROR);

export const clearActivities = createAction(types.CLEAR);
