import React, { useState } from 'react';
import { object, shape, bool } from 'prop-types';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import * as R from 'ramda';

import { SimpleMenu } from '../../../components/menus';
import { VISIT_RECURRING, VISIT_STATUS } from '../../../constants/visits';
import { EventItem, EventItemText, EventItemTime } from '../styled-components';

const getDotBackgroundColor = (status) =>
  R.cond([
    [R.equals(VISIT_STATUS.COMPLETED), () => 'success'],
    [R.equals(VISIT_STATUS.CANCELLED), () => 'error'],
    [R.equals(VISIT_STATUS.ACTIVE), () => 'primary'],
  ])(status);

const getMenuOptions = ({
  permissions,
  completeDisabled,
  cancelDisabled,
  recurring,
}) =>
  [
    {
      label: 'View more',
      onClick: () => {},
      disabled: false,
    },
    {
      label: 'Edit',
      onClick: () => {},
      disabled: !permissions.editable,
      // onClick: () =>
      //   permissions.editable && openModal({ // just pass openModal via params
      //     name: MODAL_NAME.SCHEDULE_DETAILS,
      //     payload: { scheduleId: id },
      //   }),
    },
    // only for recurring visits
    ![VISIT_RECURRING.ONE_OFF.value].includes(recurring) && {
      label: 'Edit all visits',
      onClick: () => {},
      disabled: !permissions.editable,
    },
    {
      label: 'Complete',
      onClick: () => {},
      disabled: !permissions.editable || completeDisabled,
    },
    {
      label: 'Cancel',
      onClick: () => {},
      disabled: !permissions.editable || cancelDisabled,
    },
    {
      label: 'Delete',
      onClick: () => {},
      disabled: !permissions.deletable,
    },
    // only for recurring visits
    ![VISIT_RECURRING.ONE_OFF.value].includes(recurring) && {
      label: 'Delete all visits',
      onClick: () => {},
      disabled: !permissions.deletable,
    },
  ].filter(Boolean);

export const EventContent = React.memo(({ eventInfo, permissions }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { title } = eventInfo.event;
  const time = eventInfo.timeText.replace('24:', '00:');
  const status = restData?.extendedProps?.status;
  const recurring = restData?.extendedProps?.recurring;
  const restData = eventInfo.event.toPlainObject();

  const completeDisabled = status === VISIT_STATUS.COMPLETED;
  const cancelDisabled = status === VISIT_STATUS.CANCELLED;

  const directionColumn = !eventInfo.view.type.includes('Month');
  const dotBackgroundColor = getDotBackgroundColor(status);
  const menuOptions = getMenuOptions({
    permissions,
    recurring,
    completeDisabled,
    cancelDisabled,
  });

  const onContextMenu = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <EventItem
      onContextMenu={onContextMenu}
      directionColumn={directionColumn}
      backgroundColor={dotBackgroundColor}
    >
      {!directionColumn && (
        <FiberManualRecordIcon color={dotBackgroundColor} fontSize="10px" />
      )}
      <EventItemTime directionColumn={directionColumn}>{time}</EventItemTime>
      <EventItemText directionColumn={directionColumn}>{title}</EventItemText>

      <SimpleMenu
        options={menuOptions}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleMenuClose}
      />
    </EventItem>
  );
});

EventContent.propTypes = {
  eventInfo: object.isRequired,
  permissions: shape({
    creatable: bool,
    editable: bool,
    deletable: bool,
  }).isRequired,
};
