import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ButtonPrimary } from '../../../components/buttons';
import { handleFinanceDelete } from '../../../store/finances/thunk';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import { selectFinancesLoading } from '../../../store/finances/selectors';
import {
  Text,
  Title,
  Content,
  Buttons,
  CancelButton,
} from './styled-components';

const DeleteFinanceModal = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectFinancesLoading);
  const { financeId, params } = useSelector(selectModalPayload);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = () =>
    dispatch(
      handleFinanceDelete({
        params,
        id: financeId,
        callback: closeModal,
      }),
    );

  return (
    <Content>
      <Title>Are you sure you want to delete this finance item?</Title>

      <Text>You will not be able to restore it</Text>

      <Buttons>
        <CancelButton onClick={closeModal}>Cancel</CancelButton>
        <ButtonPrimary loading={loading} onClick={onSubmit}>
          Delete
        </ButtonPrimary>
      </Buttons>
    </Content>
  );
};

export default DeleteFinanceModal;
