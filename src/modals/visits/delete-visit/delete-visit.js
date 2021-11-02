import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ButtonPrimary } from '../../../components/buttons';
import { handleVisitDelete } from '../../../store/visits/thunk';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import { selectVisitsLoading } from '../../../store/visits/selectors';
import {
  Text,
  Title,
  Content,
  Buttons,
  CancelButton,
} from './styled-components';

const DeleteVisitModal = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectVisitsLoading);
  const { scheduleId, visitId, calendarRange } =
    useSelector(selectModalPayload);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = () => {
    dispatch(
      handleVisitDelete({
        scheduleId,
        visitId,
        params: calendarRange,
        callback: closeModal,
      }),
    );
  };

  return (
    <Content>
      <Title>Are you sure you want to delete this visit?</Title>

      <Text>You will not be able to restore this visit</Text>

      <Buttons>
        <CancelButton onClick={closeModal}>Cancel</CancelButton>
        <ButtonPrimary loading={loading} onClick={onSubmit}>
          Delete
        </ButtonPrimary>
      </Buttons>
    </Content>
  );
};

export default DeleteVisitModal;
