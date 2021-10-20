import { SCHEDULE_PERMISSIONS } from '../constants/permissions';

export const getSchedulePermissionsLabels = (permissions) =>
  permissions
    .map((elem) => SCHEDULE_PERMISSIONS[elem]?.label)
    .filter(Boolean)
    .join(', ');
