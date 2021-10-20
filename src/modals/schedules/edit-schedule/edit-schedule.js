/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { ControlledInput } from '../../../components/form-items';
import { ButtonPrimary } from '../../../components/buttons';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import {
  selectSchedulesLoading,
  selectCurrentSchedule,
  selectSchedulesError,
} from '../../../store/schedules/selectors';
import FormRules from '../../../utils/form-input-rules';
import {
  Form,
  Title,
  Content,
  Buttons,
  CancelButton,
  ErrorMessage,
} from './styled-components';
import {
  handleScheduleGet,
  handleScheduleEdit,
} from '../../../store/schedules/thunk';
import { clearCurrentSchedule } from '../../../store/schedules/actions';
import useEffectAfterMount from '../../../hooks/use-effect-after-mount';
import { getErrorMessage } from '../../../utils/general';

const EditScheduleModal = () => {
  const { reset, control, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const loading = useSelector(selectSchedulesLoading);
  const error = useSelector(selectSchedulesError);
  const schedule = useSelector(selectCurrentSchedule);
  const { scheduleId } = useSelector(selectModalPayload);

  useEffect(() => {
    dispatch(handleScheduleGet(scheduleId));

    return () => dispatch(clearCurrentSchedule());
  }, []);

  useEffectAfterMount(() => {
    reset({
      name: schedule.name || '',
      description: schedule.description || '',
    });
  }, [schedule]);

  const closeModal = () => dispatch(closeCurrentModal());

  const onSubmit = handleSubmit((values) => {
    dispatch(
      handleScheduleEdit({
        scheduleId,
        body: values,
        callback: closeModal,
      }),
    );
  });

  return error ? (
    <ErrorMessage severity="error">{getErrorMessage(error)}</ErrorMessage>
  ) : (
    <Content>
      <Title>Edit schedule</Title>
      <Form onSubmit={onSubmit}>
        <ControlledInput
          name="name"
          label="Name"
          control={control}
          disabled={loading}
          rules={FormRules()
            .minLength(3, 'Name must be at least 3 characters long')
            .maxLength(50, 'Name must be no more than 50 characters long')
            .required('Please enter schedule name')}
        />

        <ControlledInput
          name="description"
          label="Description"
          control={control}
          disabled={loading}
          rules={FormRules().maxLength(
            100,
            'Description must be no more than 100 characters long',
          )}
        />

        <Buttons>
          <CancelButton onClick={closeModal}>Cancel</CancelButton>
          <ButtonPrimary loading={loading} type="submit">
            Edit
          </ButtonPrimary>
        </Buttons>
      </Form>
    </Content>
  );
};

export default EditScheduleModal;
