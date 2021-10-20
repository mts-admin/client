import { DateTime } from 'luxon';

export const formatISO = (date, format) =>
  DateTime.fromISO(date).toFormat(format);
