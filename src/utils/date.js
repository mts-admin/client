/* eslint-disable arrow-body-style */
import { DateTime } from 'luxon';
import * as R from 'ramda';

export const formatISO = (date, format) =>
  DateTime.fromISO(date).toFormat(format);

export const dateToISOString = (date) => DateTime.fromJSDate(date).toString();

export const areDatesInTheSameDay = (date1, date2) =>
  DateTime.fromISO(date1).startOf('day').toString() ===
  DateTime.fromISO(date2).startOf('day').toString();

export const getInclusiveDate = (date, allDay) =>
  allDay
    ? DateTime.fromJSDate(date).minus({ days: 1 }).toString()
    : dateToISOString(date);

export const startOfDate = (date, startOf) =>
  date ? DateTime.fromISO(date).startOf(startOf).toString() : '';

export const getWeekDaysList = (format = 'ccc') =>
  R.range(1, 8).map((day) => ({
    label: DateTime.fromObject({ weekday: day }).toFormat(format),
    // replace 7 with 0 because server use 'moment' instead of 'luxon'
    // luxon Sunday === 7; moment Sunday === 0
    value: day === 7 ? 0 : day,
  }));

export const setTime = (date = DateTime.now(), time) => {
  const formattedDate = DateTime.fromISO(date);
  const formattedTime = DateTime.fromISO(time);

  return formattedDate
    .set({
      year: formattedDate.year,
      month: formattedDate.month,
      day: formattedDate.day,
      hour: formattedTime.hour,
      minute: formattedTime.minute,
      second: 0,
      millisecond: 0,
    })
    .toString();
};

export const getNextWeekDay = (dayOfWeek) => {
  const currentDayOfWeek = DateTime.now().weekday;
  const dataToSet = {
    weekday: dayOfWeek,
    hour: 0,
    minute: 0,
    second: 10,
  };

  if (currentDayOfWeek < dayOfWeek) {
    return DateTime.fromObject(dataToSet).toJSDate();
  }

  return DateTime.fromObject(dataToSet).plus({ week: 1 }).toJSDate();
};
