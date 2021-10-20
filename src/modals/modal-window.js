import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SimpleModal from '../components/simple-modal';
import { MODAL_NAME } from './constants';
import { closeCurrentModal, selectModalName } from './modal-reducer';
import CreateScheduleModal from './schedules/create-schedule';
import DeleteScheduleModal from './schedules/delete-schedule';
import ScheduleDetailsModal from './schedules/schedule-details';
import LeaveScheduleModal from './schedules/leave-schedule';
import EditScheduleModal from './schedules/edit-schedule';
import ManageScheduleParticipantsModal from './schedules/manage-schedule-participants';

const modals = {
  [MODAL_NAME.SCHEDULE_DETAILS]: ScheduleDetailsModal,
  [MODAL_NAME.CREATE_SCHEDULE]: CreateScheduleModal,
  [MODAL_NAME.EDIT_SCHEDULE]: EditScheduleModal,
  [MODAL_NAME.MANAGE_PARTICIPANTS]: ManageScheduleParticipantsModal,
  [MODAL_NAME.LEAVE_SCHEDULE]: LeaveScheduleModal,
  [MODAL_NAME.DELETE_SCHEDULE]: DeleteScheduleModal,
  empty: () => null,
};

const ModalWindow = () => {
  const dispatch = useDispatch();

  const name = useSelector(selectModalName);

  const onClose = () => dispatch(closeCurrentModal());

  const ActiveModal = modals[name] || modals.empty;

  return (
    <SimpleModal open={!!name} onClose={onClose}>
      <ActiveModal />
    </SimpleModal>
  );
};

export default ModalWindow;
