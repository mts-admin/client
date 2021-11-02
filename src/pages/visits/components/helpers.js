import * as R from 'ramda';

import { VISIT_RECURRING, VISIT_STATUS } from '../../../constants/visits';
import { MODAL_NAME } from '../../../modals/constants';

export const getDotBackgroundColor = (status) =>
  R.cond([
    [R.equals(VISIT_STATUS.COMPLETED), () => 'success'],
    [R.equals(VISIT_STATUS.CANCELLED), () => 'error'],
    [R.equals(VISIT_STATUS.ACTIVE), () => 'primary'],
  ])(status);

export const getMenuOptions = ({
  visitId,
  scheduleId,
  permissions,
  recurring,
  visitDate,
  calendarRange,
  completeDisabled,
  cancelDisabled,
  openModalWindow,
  cancelVisit,
  completeVisit,
}) =>
  [
    {
      label: 'View more',
      disabled: false,
      onClick: () =>
        openModalWindow({
          name: MODAL_NAME.VIEW_VISIT,
          payload: { scheduleId, visitId },
        }),
    },
    {
      label: 'Edit',
      disabled: !permissions.editable,
      onClick: () =>
        permissions.editable &&
        openModalWindow({
          name: MODAL_NAME.EDIT_VISIT,
          payload: { scheduleId, visitId, calendarRange },
        }),
    },
    // only for recurring visits
    ![VISIT_RECURRING.ONE_OFF.value].includes(recurring) && {
      label: 'Edit all visits',
      disabled: !permissions.editable,
      onClick: () =>
        permissions.editable &&
        openModalWindow({
          name: MODAL_NAME.EDIT_ALL_VISITS,
          payload: { scheduleId, visitId, calendarRange },
        }),
    },
    {
      label: 'Complete',
      disabled: !permissions.editable || completeDisabled,
      onClick: () => permissions.editable && completeVisit(),
    },
    {
      label: 'Cancel',
      disabled: !permissions.editable || cancelDisabled,
      onClick: () => permissions.editable && cancelVisit(),
    },
    {
      label: 'Delete',
      disabled: !permissions.deletable,
      onClick: () =>
        permissions.deletable &&
        openModalWindow({
          name: MODAL_NAME.DELETE_VISIT,
          payload: { scheduleId, visitId, calendarRange },
        }),
    },
    // only for recurring visits
    ![VISIT_RECURRING.ONE_OFF.value].includes(recurring) && {
      label: 'Delete all visits',
      disabled: !permissions.deletable,
      onClick: () =>
        permissions.deletable &&
        openModalWindow({
          name: MODAL_NAME.DELETE_ALL_VISITS,
          payload: {
            scheduleId,
            visitId,
            visitDate,
            calendarRange,
          },
        }),
    },
  ].filter(Boolean);
