import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ButtonPrimary } from '../../../components/buttons';
import { handleAllVisitsDelete } from '../../../store/visits/thunk';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import { selectVisitsLoading } from '../../../store/visits/selectors';
import {
  Text,
  Title,
  Content,
  Buttons,
  CancelButton,
} from './styled-components';
import { formatISO } from '../../../utils/date';

const DeleteAllVisitsModal = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectVisitsLoading);
  const { scheduleId, visitId, calendarRange, visitDate } =
    useSelector(selectModalPayload);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = () => {
    dispatch(
      handleAllVisitsDelete({
        scheduleId,
        visitId,
        params: calendarRange,
        callback: closeModal,
      }),
    );
  };

  return (
    <Content>
      <Title>Are you sure you want to delete all this visits?</Title>

      <Text>
        All future visits from this group after {formatISO(visitDate, 'D')}{' '}
        inclusive will be deleted
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

export default DeleteAllVisitsModal;
