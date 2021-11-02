import * as R from 'ramda';

import { VISIT_RECURRING } from '../../../constants/visits';
import { startOfDate, areDatesInTheSameDay } from '../../../utils/date';

const ONE_OFF = VISIT_RECURRING.ONE_OFF.value;
const DAILY = VISIT_RECURRING.DAILY.value;
const WEEKLY = VISIT_RECURRING.WEEKLY.value;

export const getDefaultRecurring = (start, end) => {
  if (!start && !end) return ONE_OFF;

  return areDatesInTheSameDay(start, end) ? ONE_OFF : DAILY;
};

export const getDefaultDateTime = (start, end, recurring) =>
  R.cond([
    [
      R.equals(ONE_OFF),
      () => ({
        startTime: start !== end ? start : '',
        endTime: start !== end ? end : '',
        date: startOfDate(start, 'day'),
      }),
    ],
    [
      R.equals(DAILY),
      () => ({
        dateRange: [start, end],
      }),
    ],
    [R.T, () => ({})],
  ])(recurring);

export const getDefaultState = (dates) => {
  if (!dates) {
    return {
      recurring: ONE_OFF,
    };
  }

  const { start, end } = dates;

  const recurring = getDefaultRecurring(start, end);
  const dateTime = getDefaultDateTime(start, end, recurring);

  return {
    recurring,
    ...dateTime,
  };
};

export const getRequestData = (recurring, createOneOff, createRecurring) =>
  R.cond([
    [
      R.equals(ONE_OFF),
      () => ({
        action: createOneOff,
        fields: ['title', 'notes', 'startTime', 'endTime', 'date'],
      }),
    ],
    [
      R.equals(DAILY),
      () => ({
        action: createRecurring,
        fields: [
          'title',
          'notes',
          'startTime',
          'endTime',
          'dateRange',
          'recurring',
        ],
      }),
    ],
    [
      R.equals(WEEKLY),
      () => ({
        action: createRecurring,
        fields: [
          'title',
          'notes',
          'startTime',
          'endTime',
          'dateRange',
          'recurring',
          'daysOfWeek',
        ],
      }),
    ],
    [R.T, () => ({})],
  ])(recurring);
