import { COLORS } from '../styles/theme';

export const SPRINT_STATUS = {
  IN_PROGRESS: {
    value: 'IN_PROGRESS',
    label: 'In progress',
  },
  DONE: {
    value: 'DONE',
    label: 'Done',
  },
  EXPIRED: {
    value: 'EXPIRED',
    label: 'Expired',
  },
  ARCHIVED: {
    value: 'ARCHIVED',
    label: 'Archived',
  },
};

export const SPRINT_PRIORITY = {
  LOW: {
    value: 'LOW',
    label: 'Low',
  },
  MEDIUM: {
    value: 'MEDIUM',
    label: 'Medium',
  },
  HIGH: {
    value: 'HIGH',
    label: 'High',
  },
};

export const SPRINT_SORT_VALUE = {
  NEW_FIRST: {
    value: '-createdAt',
    label: 'Creation date: new first',
  },
  OLD_FIRST: {
    value: 'createdAt',
    label: 'Creation date: old first',
  },
  DUE_DATE_DESC: {
    value: '-dueDate',
    label: 'Due date: latest first',
  },
  DUE_DATE_ASC: {
    value: 'dueDate',
    label: 'Due date: soonest first',
  },
  PRIORITY_DESC: {
    value: '-priority',
    label: 'Priority: from high to low',
  },
  PRIORITY_ASC: {
    value: 'priority',
    label: 'Priority: from low to high',
  },
};

export const SPRINT_TAB = {
  ALL: {
    value: 'ALL',
    label: 'All',
  },
  IN_PROGRESS: {
    value: 'IN_PROGRESS',
    label: 'In progress',
  },
  DONE: {
    value: 'DONE',
    label: 'Done',
  },
  EXPIRED: {
    value: 'EXPIRED',
    label: 'Expired',
  },
  ARCHIVED: {
    value: 'ARCHIVED',
    label: 'Archived',
  },
};

export const TASK_STATUS = {
  ACTIVE: 'ACTIVE',
  DONE: 'DONE',
};

export const SPRINT_PRIORITY_COLORS = {
  LOW: COLORS.BLUE,
  MEDIUM: COLORS.SUCCESS,
  HIGH: COLORS.ERROR,
};

export const SPRINT_STATUS_COLORS = {
  IN_PROGRESS: COLORS.BLUE,
  DONE: COLORS.SUCCESS,
  EXPIRED: COLORS.ERROR,
  ARCHIVED: COLORS.GREY,
};
