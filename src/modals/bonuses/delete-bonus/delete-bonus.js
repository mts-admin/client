import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ButtonPrimary } from '../../../components/buttons';
import { handleBonusDelete } from '../../../store/bonuses/thunk';
import { selectBonusesLoading } from '../../../store/bonuses/selectors';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import {
  Text,
  Title,
  Content,
  Buttons,
  CancelButton,
} from './styled-components';

const DeleteBonusModal = () => {
  const dispatch = useDispatch();

  const { id, userId, params, cancelToken } = useSelector(selectModalPayload);
  const loading = useSelector(selectBonusesLoading);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = () => {
    dispatch(
      handleBonusDelete({
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
      <Title>Are you sure you want to delete this bonus?</Title>

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

export default DeleteBonusModal;
