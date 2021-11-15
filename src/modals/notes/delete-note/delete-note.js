import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ButtonPrimary } from '../../../components/buttons';
import { handleNoteDelete } from '../../../store/notes/thunk';
import { selectNotesLoading } from '../../../store/notes/selectors';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import {
  Text,
  Title,
  Content,
  Buttons,
  CancelButton,
} from './styled-components';

const DeleteNoteModal = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectNotesLoading);
  const { id, params } = useSelector(selectModalPayload);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = () => {
    dispatch(handleNoteDelete({ id, params, callback: closeModal }));
  };

  return (
    <Content>
      <Title>Are you sure you want to delete this note?</Title>

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

export default DeleteNoteModal;
