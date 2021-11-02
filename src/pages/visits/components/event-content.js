import React, { useState } from 'react';
import { object, shape, bool, string } from 'prop-types';
import { useDispatch } from 'react-redux';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { openModal } from '../../../modals/modal-reducer';
import { EventItem, EventItemText, EventItemTime } from '../styled-components';
import { SimpleMenu } from '../../../components/menus';
import { VISIT_STATUS } from '../../../constants/visits';
import { getDotBackgroundColor, getMenuOptions } from './helpers';
import { handleVisitEdit } from '../../../store/visits/thunk';

export const EventContent = React.memo(
  ({ eventInfo, permissions, calendarRange }) => {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { title } = eventInfo.event;
    const time = eventInfo.timeText.replace('24:', '00:');
    const restData = eventInfo.event.toPlainObject();
    const status = restData?.extendedProps?.status;
    const recurring = restData?.extendedProps?.recurring;
    const scheduleId = restData?.extendedProps?.scheduleId;
    const visitId = restData.id;
    const visitDate = restData.start;

    const completeDisabled = status === VISIT_STATUS.COMPLETED;
    const cancelDisabled = status === VISIT_STATUS.CANCELLED;

    const openModalWindow = (payload) => dispatch(openModal(payload));
    const cancelVisit = () =>
      dispatch(
        handleVisitEdit({
          scheduleId,
          visitId,
          body: { status: VISIT_STATUS.CANCELLED },
          params: calendarRange,
        }),
      );
    const completeVisit = () =>
      dispatch(
        handleVisitEdit({
          scheduleId,
          visitId,
          body: { status: VISIT_STATUS.COMPLETED },
          params: calendarRange,
        }),
      );

    const directionColumn = !eventInfo.view.type.includes('Month');
    const dotBackgroundColor = getDotBackgroundColor(status);
    const menuOptions = getMenuOptions({
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
  },
);

EventContent.propTypes = {
  eventInfo: object.isRequired,
  permissions: shape({
    creatable: bool,
    editable: bool,
    deletable: bool,
  }).isRequired,
  calendarRange: shape({
    start: string.isRequired,
    end: string.isRequired,
  }).isRequired,
};
