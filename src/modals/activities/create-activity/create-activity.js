import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as R from 'ramda';

import { handleActivityCreate } from '../../../store/activities/thunk';
import { selectActivitiesLoading } from '../../../store/activities/selectors';
import { makeSelectUsers } from '../../../store/users/selectors';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import {
  ControlledInput,
  ControlledSelect,
  ControlledAutocomplete,
} from '../../../components/form-items';
import { ButtonPrimary } from '../../../components/buttons';
import FormRules from '../../../utils/form-input-rules';
import {
  Form,
  Title,
  Content,
  Buttons,
  CancelButton,
  SelectWrapper,
} from './styled-components';
import { ACTIVITY_STATUS_FILTERS } from '../../../constants/activities';

const CreateActivityModal = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      status: ACTIVITY_STATUS_FILTERS.CREATED.value,
    },
  });

  const selectUsers = useMemo(makeSelectUsers, []);

  const { callback, cancelToken } = useSelector(selectModalPayload);
  const users = useSelector(selectUsers);
  const loading = useSelector(selectActivitiesLoading);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = handleSubmit((values) => {
    const body = {
      ...values,
      userId: values.userId?.id,
    };
    const cb = (userId) => {
      R.is(Function, callback) && callback(userId);
      closeModal();
    };

    dispatch(
      handleActivityCreate({
        body,
        userId: values.userId,
        callback: cb,
        cancelToken,
      }),
    );
  });

  const statusList = useMemo(
    () => Object.values(R.pick(['CREATED', 'ACTIVE'], ACTIVITY_STATUS_FILTERS)),
    [],
  );
  const usersList = useMemo(
    () => users.map((user) => ({ id: user._id, label: user.name })),
    [users],
  );

  return (
    <Content>
      <Title>Create activity</Title>

      <Form onSubmit={onSubmit}>
        <ControlledInput
          name="content"
          label="Content"
          control={control}
          rules={FormRules()
            .maxLength(500, 'Content must be no more than 500 characters long')
            .required('Please enter the content')}
        />

        <SelectWrapper>
          <ControlledSelect
            data={statusList}
            control={control}
            name="status"
            label="Status"
            rules={FormRules().required('Please select a status')}
          />
          <ControlledAutocomplete
            data={usersList}
            control={control}
            name="userId"
            label="User"
            rules={FormRules().required('Please select a user')}
            disablePortal={false}
          />
        </SelectWrapper>

        <Buttons>
          <CancelButton onClick={closeModal} disabled={loading}>
            Cancel
          </CancelButton>
          <ButtonPrimary loading={loading} type="submit">
            Create
          </ButtonPrimary>
        </Buttons>
      </Form>
    </Content>
  );
};

export default CreateActivityModal;
