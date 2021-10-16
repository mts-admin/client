import * as R from 'ramda';

import history from '../../../../store/history';
import { SCHEDULE_TYPE } from '../../../../constants/schedules';
import { DYNAMIC_ROUTE } from '../../../../routes/constants';
import { MODAL_NAME } from '../../../../modals/constants';

export const getMenuOptions = ({ id, type, page, openModal }) =>
  R.cond([
    [
      R.equals(SCHEDULE_TYPE.MY),
      () => [
        {
          label: 'Go to visits',
          onClick: () => history.push(DYNAMIC_ROUTE.SCHEDULE(id)),
        },
        {
          label: 'Details',
          onClick: () =>
            openModal({
              name: MODAL_NAME.SCHEDULE_DETAILS,
              payload: { scheduleId: id },
            }),
        },
        {
          label: 'Edit',
          onClick: () =>
            openModal({ name: MODAL_NAME.EDIT_SCHEDULE, payload: id }),
        },
        {
          label: 'Manage participants',
          onClick: () =>
            openModal({ name: MODAL_NAME.MANAGE_PARTICIPANTS, payload: id }),
        },
        {
          label: 'Delete',
          onClick: () =>
            openModal({
              name: MODAL_NAME.DELETE_SCHEDULE,
              payload: { page, scheduleId: id },
            }),
        },
      ],
    ],
    [
      R.equals(SCHEDULE_TYPE.SHARED),
      () => [
        {
          label: 'Go to visits',
          onClick: () => history.push(DYNAMIC_ROUTE.SCHEDULE(id)),
        },
        {
          label: 'Details',
          onClick: () =>
            openModal({
              name: MODAL_NAME.SCHEDULE_DETAILS,
              payload: { scheduleId: id },
            }),
        },
        {
          label: 'Leave',
          onClick: () =>
            openModal({ name: MODAL_NAME.LEAVE_SCHEDULE, payload: id }),
        },
      ],
    ],
  ])(type);
