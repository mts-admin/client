import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ButtonPrimary } from '../../components/buttons';
import { handleScheduleDelete } from '../../store/schedules/thunk';
import { closeCurrentModal, selectModalPayload } from '../modal-reducer';
import { selectSchedulesLoading } from '../../store/schedules/selectors';
import {
  Text,
  Title,
  Content,
  Buttons,
  CancelButton,
} from './styled-components';

const DeleteScheduleModal = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectSchedulesLoading);
  const { page, scheduleId } = useSelector(selectModalPayload);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = () => {
    dispatch(
      handleScheduleDelete({
        page,
        scheduleId,
        callback: closeModal,
      }),
    );
  };

  return (
    <Content>
      <Title>Are you sure you want to delete this schedule?</Title>

      <Text>
        All visits of this schedule will be deleted and cannot be restored
      </Text>

      <Buttons>
        <CancelButton onClick={closeModal}>Cancel</CancelButton>
        <ButtonPrimary loading={loading} onClick={onSubmit}>
          Delete
        </ButtonPrimary>
      </Buttons>
    </Content>
  );
};

export default DeleteScheduleModal;
