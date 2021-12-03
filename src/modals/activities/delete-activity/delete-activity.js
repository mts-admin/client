import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ButtonPrimary } from '../../../components/buttons';
import { handleActivityDelete } from '../../../store/activities/thunk';
import { selectActivitiesLoading } from '../../../store/activities/selectors';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import {
  Text,
  Title,
  Content,
  Buttons,
  CancelButton,
} from './styled-components';

const DeleteActivityModal = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectActivitiesLoading);
  const { id, userId, params, cancelToken } = useSelector(selectModalPayload);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = () => {
    dispatch(
      handleActivityDelete({
        id,
        userId,
        params,
        callback: closeModal,
        cancelToken,
      }),
    );
  };

  return (
    <Content>
      <Title>Are you sure you want to delete this activity?</Title>

      <Text>You will not be able to restore it</Text>

      <Buttons>
        <CancelButton onClick={closeModal} disabled={loading}>
          Cancel
        </CancelButton>
        <ButtonPrimary loading={loading} onClick={onSubmit}>
          Delete
        </ButtonPrimary>
      </Buttons>
    </Content>
  );
};

export default DeleteActivityModal;
