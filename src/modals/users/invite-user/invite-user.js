import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as R from 'ramda';

import { handleUserInvite } from '../../../store/users/thunk';
import { selectUsersLoading } from '../../../store/users/selectors';
import {
  ControlledInput,
  ControlledSelect,
} from '../../../components/form-items';
import { ButtonPrimary } from '../../../components/buttons';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import FormRules from '../../../utils/form-input-rules';
import {
  Form,
  Title,
  Content,
  Buttons,
  Description,
  CancelButton,
} from './styled-components';
import { USER_ROLE_FILTERS } from '../../../constants/users';

const InviteUserModal = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm();

  const { callback, cancelToken } = useSelector(selectModalPayload);
  const loading = useSelector(selectUsersLoading);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = handleSubmit((values) => {
    const cb = () => {
      R.is(Function, callback) && callback();
      closeModal();
    };
    dispatch(
      handleUserInvite({
        body: values,
        params: { sort: 'name' },
        callback: cb,
        cancelToken,
      }),
    );
  });

  return (
    <Content>
      <Title>Invite user</Title>

      <Description>
        User will receive an email message with registration link
      </Description>

      <Form onSubmit={onSubmit}>
        <ControlledInput
          name="name"
          label="Name"
          control={control}
          disabled={loading}
          rules={FormRules()
            .maxLength(50, 'Name must be no more than 50 characters long')
            .required('Please enter user name')}
        />

        <ControlledInput
          name="email"
          label="Email"
          type="email"
          control={control}
          disabled={loading}
          rules={FormRules().email().required('Please enter an email')}
        />

        <ControlledSelect
          name="role"
          label="Role"
          data={Object.values(R.pick(['USER', 'ADMIN'], USER_ROLE_FILTERS))}
          control={control}
          disabled={loading}
          rules={FormRules().required('Please select a role')}
        />

        <Buttons>
          <CancelButton onClick={closeModal} disabled={loading}>
            Cancel
          </CancelButton>
          <ButtonPrimary loading={loading} type="submit">
            Invite
          </ButtonPrimary>
        </Buttons>
      </Form>
    </Content>
  );
};

export default InviteUserModal;
