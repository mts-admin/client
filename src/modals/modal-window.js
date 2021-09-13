import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SimpleModal from '../components/simple-modal';
import { MODAL_NAME } from './constants';
import { closeCurrentModal, selectModalName } from './modal-reducer';
import CreateScheduleModal from './create-schedule';
import DeleteScheduleModal from './delete-schedule';
import ScheduleDetailsModal from './schedule-details';

const modals = {
  [MODAL_NAME.SCHEDULE_DETAILS]: ScheduleDetailsModal,
  [MODAL_NAME.CREATE_SCHEDULE]: CreateScheduleModal,
  [MODAL_NAME.EDIT_SCHEDULE]: () => <div>Edit schedule</div>,
  [MODAL_NAME.MANAGE_PARTICIPANTS]: () => <div>Manage participants</div>,
  [MODAL_NAME.LEAVE_SCHEDULE]: () => <div>Leave schedule</div>,
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
