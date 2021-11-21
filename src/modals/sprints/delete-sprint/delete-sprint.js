import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ButtonPrimary } from '../../../components/buttons';
import { handleSprintDelete } from '../../../store/sprints/thunk';
import { selectSprintsLoading } from '../../../store/sprints/selectors';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import {
  Text,
  Title,
  Content,
  Buttons,
  CancelButton,
} from './styled-components';

const DeleteSprintModal = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectSprintsLoading);
  const { id, params } = useSelector(selectModalPayload);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = () => {
    dispatch(handleSprintDelete({ id, params, callback: closeModal }));
  };

  return (
    <Content>
      <Title>Are you sure you want to delete this sprint?</Title>

      <Text>
        All tasks of this sprint will be deleted and cannot be restored
      </Text>

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

export default DeleteSprintModal;
