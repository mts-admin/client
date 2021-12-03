import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as R from 'ramda';

import { handleUserEdit, handleUserGet } from '../../../store/users/thunk';
import {
  selectUserCurrentItem,
  selectUsersError,
  selectUsersLoading,
} from '../../../store/users/selectors';
import { ControlledSelect } from '../../../components/form-items';
import { ButtonPrimary } from '../../../components/buttons';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import FormRules from '../../../utils/form-input-rules';
import {
  Form,
  Title,
  Inputs,
  Content,
  Buttons,
  CancelButton,
  ErrorMessage,
} from './styled-components';
import {
  USER_ROLE_FILTERS,
  USER_STATUS_FILTERS,
} from '../../../constants/users';
import useEffectAfterMount from '../../../hooks/use-effect-after-mount';
import { getErrorMessage } from '../../../utils/general';

const EditUserModal = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm();

  const { userId } = useSelector(selectModalPayload);
  const user = useSelector(selectUserCurrentItem);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  useEffect(() => {
    dispatch(handleUserGet(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectAfterMount(() => {
    reset({
      role: user.role,
      status: user.status,
    });
  }, [user]);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = handleSubmit((values) => {
    dispatch(
      handleUserEdit({
        id: userId,
        body: values,
        callback: closeModal,
      }),
    );
  });

  return error ? (
    <ErrorMessage severity="error">{getErrorMessage(error)}</ErrorMessage>
  ) : (
    <Content>
      <Title>Edit user</Title>

      <Form onSubmit={onSubmit}>
        <Inputs>
          <ControlledSelect
            name="status"
            label="Status"
            data={Object.values(
              R.pick(['ACTIVE', 'DEACTIVATED'], USER_STATUS_FILTERS),
            )}
            control={control}
            disabled={loading}
            rules={FormRules().required('Please select a status')}
          />

          <ControlledSelect
            name="role"
            label="Role"
            data={Object.values(R.pick(['USER', 'ADMIN'], USER_ROLE_FILTERS))}
            control={control}
            disabled={loading}
            rules={FormRules().required('Please select a role')}
          />
        </Inputs>

        <Buttons>
          <CancelButton onClick={closeModal} disabled={loading}>
            Cancel
          </CancelButton>
          <ButtonPrimary loading={loading} type="submit">
            Edit
          </ButtonPrimary>
        </Buttons>
      </Form>
    </Content>
  );
};

export default EditUserModal;
