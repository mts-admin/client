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
import CreateVisitModal from './visits/create-visit';
import ViewVisitModal from './visits/view-visit';
import EditVisitModal from './visits/edit-visit';
import EditAllVisitsModal from './visits/edit-all-visits';
import DeleteVisitModal from './visits/delete-visit';
import DeleteAllVisitsModal from './visits/delete-all-visits';
import CreateFinanceModal from './finances/create-finance';
import EditFinanceModal from './finances/edit-finance';
import DeleteFinanceModal from './finances/delete-finance';
import ViewFinanceModal from './finances/view-finance';
import DeleteNoteModal from './notes/delete-note';
import CreateSprintModal from './sprints/create-sprint';
import EditSprintModal from './sprints/edit-sprint';
import DeleteSprintModal from './sprints/delete-sprint';
import ViewBonusModal from './bonuses/view-bonus';
import CreateBonusModal from './bonuses/create-bonus';
import EditBonusModal from './bonuses/edit-bonus';
import DeleteBonusModal from './bonuses/delete-bonus';
import ViewActivityModal from './activities/view-activity';
import ViewUserActivityModal from './activities/view-user-activity';
import CreateActivityModal from './activities/create-activity';
import EditActivityModal from './activities/edit-activity';
import DeleteActivityModal from './activities/delete-activity';
import ViewUserModal from './users/view-user';
import InviteUserModal from './users/invite-user';
import EditUserModal from './users/edit-user';
import CancelInvitationModal from './users/cancel-invitation';

const modals = {
  [MODAL_NAME.SCHEDULE_DETAILS]: ScheduleDetailsModal,
  [MODAL_NAME.CREATE_SCHEDULE]: CreateScheduleModal,
  [MODAL_NAME.EDIT_SCHEDULE]: EditScheduleModal,
  [MODAL_NAME.MANAGE_PARTICIPANTS]: ManageScheduleParticipantsModal,
  [MODAL_NAME.LEAVE_SCHEDULE]: LeaveScheduleModal,
  [MODAL_NAME.DELETE_SCHEDULE]: DeleteScheduleModal,
  [MODAL_NAME.CREATE_VISIT]: CreateVisitModal,
  [MODAL_NAME.EDIT_VISIT]: EditVisitModal,
  [MODAL_NAME.EDIT_ALL_VISITS]: EditAllVisitsModal,
  [MODAL_NAME.DELETE_VISIT]: DeleteVisitModal,
  [MODAL_NAME.DELETE_ALL_VISITS]: DeleteAllVisitsModal,
  [MODAL_NAME.VIEW_VISIT]: ViewVisitModal,
  [MODAL_NAME.VIEW_FINANCE]: ViewFinanceModal,
  [MODAL_NAME.CREATE_FINANCE]: CreateFinanceModal,
  [MODAL_NAME.EDIT_FINANCE]: EditFinanceModal,
  [MODAL_NAME.DELETE_FINANCE]: DeleteFinanceModal,
  [MODAL_NAME.DELETE_NOTE]: DeleteNoteModal,
  [MODAL_NAME.CREATE_SPRINT]: CreateSprintModal,
  [MODAL_NAME.EDIT_SPRINT]: EditSprintModal,
  [MODAL_NAME.DELETE_SPRINT]: DeleteSprintModal,
  [MODAL_NAME.VIEW_BONUS]: ViewBonusModal,
  [MODAL_NAME.CREATE_BONUS]: CreateBonusModal,
  [MODAL_NAME.EDIT_BONUS]: EditBonusModal,
  [MODAL_NAME.DELETE_BONUS]: DeleteBonusModal,
  [MODAL_NAME.VIEW_ACTIVITY]: ViewActivityModal,
  [MODAL_NAME.VIEW_USER_ACTIVITY]: ViewUserActivityModal,
  [MODAL_NAME.CREATE_ACTIVITY]: CreateActivityModal,
  [MODAL_NAME.EDIT_ACTIVITY]: EditActivityModal,
  [MODAL_NAME.DELETE_ACTIVITY]: DeleteActivityModal,
  [MODAL_NAME.VIEW_USER]: ViewUserModal,
  [MODAL_NAME.INVITE_USER]: InviteUserModal,
  [MODAL_NAME.EDIT_USER]: EditUserModal,
  [MODAL_NAME.CANCEL_INVITATION]: CancelInvitationModal,
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
