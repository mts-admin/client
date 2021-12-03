import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ButtonPrimary } from '../../../components/buttons';
import { handleScheduleLeave } from '../../../store/schedules/thunk';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import { selectSchedulesLoading } from '../../../store/schedules/selectors';
import {
  Text,
  Title,
  Content,
  Buttons,
  CancelButton,
} from './styled-components';

const LeaveScheduleModal = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectSchedulesLoading);
  const { page, scheduleId } = useSelector(selectModalPayload);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = () => {
    dispatch(
      handleScheduleLeave({
        page,
        scheduleId,
        callback: closeModal,
      }),
    );
  };

  return (
    <Content>
      <Title>Are you sure you want to leave this schedule?</Title>

      <Text>You will lose access to all data in this schedule</Text>

      <Buttons>
        <CancelButton onClick={closeModal} disabled={loading}>
          Cancel
        </CancelButton>
        <ButtonPrimary loading={loading} onClick={onSubmit}>
          Leave
        </ButtonPrimary>
      </Buttons>
    </Content>
  );
};

export default LeaveScheduleModal;
