import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as R from 'ramda';

import { ControlledInput } from '../../../components/form-items';
import { ButtonPrimary } from '../../../components/buttons';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import { selectSchedulesLoading } from '../../../store/schedules/selectors';
import FormRules from '../../../utils/form-input-rules';
import {
  Form,
  Title,
  Content,
  Buttons,
  CancelButton,
} from './styled-components';
import { handleScheduleCreate } from '../../../store/schedules/thunk';

const CreateScheduleModal = () => {
  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const loading = useSelector(selectSchedulesLoading);
  const payload = useSelector(selectModalPayload);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = handleSubmit((values) => {
    const body = R.filter(Boolean, values);
    const callback = () => {
      R.is(Function, payload.callback) && payload.callback();
      closeModal();
    };
    dispatch(
      handleScheduleCreate({
        body,
        callback,
        cancelToken: payload.cancelToken,
      }),
    );
  });

  return (
    <Content>
      <Title>Create schedule</Title>

      <Form onSubmit={onSubmit}>
        <ControlledInput
          name="name"
          label="Name"
          control={control}
          rules={FormRules()
            .minLength(3, 'Name must be at least 3 characters long')
            .maxLength(50, 'Name must be no more than 50 characters long')
            .required('Please enter schedule name')}
        />

        <ControlledInput
          name="description"
          label="Description"
          control={control}
          rules={FormRules().maxLength(
            100,
            'Description must be no more than 100 characters long',
          )}
        />

        <Buttons>
          <CancelButton onClick={closeModal}>Cancel</CancelButton>
          <ButtonPrimary loading={loading} type="submit">
            Create
          </ButtonPrimary>
        </Buttons>
      </Form>
    </Content>
  );
};

export default CreateScheduleModal;
