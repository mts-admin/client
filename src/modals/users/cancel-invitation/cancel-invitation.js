import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { handleCancelInvitation } from '../../../store/users/thunk';
import { selectUsersLoading } from '../../../store/users/selectors';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import { ButtonPrimary } from '../../../components/buttons';
import {
  Text,
  Title,
  Content,
  Buttons,
  CancelButton,
} from './styled-components';

const CancelInvitationModal = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectUsersLoading);
  const { user, params, cancelToken } = useSelector(selectModalPayload);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = () => {
    const token = user.techData.invitationToken;
    dispatch(
      handleCancelInvitation({
        token,
        params,
        cancelToken,
        callback: closeModal,
      }),
    );
  };

  return (
    <Content>
      <Title>Are you sure you want to cancel invitation of this user?</Title>

      <Text>
        The invitation link will be invalid and the user will not be able to
        finish the registration
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

export default CancelInvitationModal;
