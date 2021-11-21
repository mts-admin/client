import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { DateTime } from 'luxon';
import * as R from 'ramda';

import {
  Content,
  Title,
  Row,
  Form,
  FormSection,
  Buttons,
} from './styled-components';
import {
  handleSprintEdit,
  handleSprintGet,
} from '../../../store/sprints/thunk';
import {
  selectCurrentSprint,
  selectSprintsLoading,
} from '../../../store/sprints/selectors';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import {
  ControlledInput,
  ControlledSelect,
  ControlledDatePicker,
} from '../../../components/form-items';
import { ButtonPrimary, TextButton } from '../../../components/buttons';
import { SPRINT_PRIORITY, SPRINT_STATUS } from '../../../constants/sprints';
import useEffectAfterMount from '../../../hooks/use-effect-after-mount';
import FormRules from '../../../utils/form-input-rules';
import { areDatesInTheSameDay } from '../../../utils/date';

const EditSprintModal = () => {
  const dispatch = useDispatch();

  const { id, params } = useSelector(selectModalPayload);
  const sprint = useSelector(selectCurrentSprint);
  const loading = useSelector(selectSprintsLoading);

  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    dispatch(handleSprintGet(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectAfterMount(() => {
    reset({
      title: sprint.title || '',
      description: sprint.description || '',
      status: sprint.status || '',
      priority: sprint.priority || '',
      dueDate: sprint.dueDate || '',
    });
  }, [sprint]);

  const closeModal = () => dispatch(closeCurrentModal());

  const handleFormSubmit = handleSubmit(
    ({ title, description, priority, status, dueDate }) => {
      const data = {
        title,
        description,
        priority,
        ...(status !== sprint.status && { status }),
        ...(!areDatesInTheSameDay(dueDate, sprint.dueDate) && {
          dueDate: DateTime.fromISO(dueDate).endOf('day').toString(),
        }),
      };
      dispatch(
        handleSprintEdit({ id, body: data, params, callback: closeModal }),
      );
    },
  );

  return (
    <Content>
      <Title>Edit sprint</Title>

      <Form>
        <Row>
          <FormSection title="General info">
            <ControlledInput
              name="title"
              label="Title"
              control={control}
              rules={FormRules().required('Please enter a title')}
            />

            <ControlledInput
              control={control}
              name="description"
              label="Description"
              multiline
              minRows={3}
              maxRows={10}
            />
          </FormSection>
        </Row>

        <Row>
          <FormSection title="Status">
            <ControlledSelect
              data={Object.values(R.omit(['EXPIRED'], SPRINT_STATUS))}
              control={control}
              name="status"
              rules={FormRules().required('Please select a status')}
            />
          </FormSection>

          <FormSection title="Priority">
            <ControlledSelect
              data={Object.values(SPRINT_PRIORITY)}
              control={control}
              name="priority"
              rules={FormRules().required('Please select a priority')}
            />
          </FormSection>

          <FormSection title="Due date">
            <ControlledDatePicker
              name="dueDate"
              control={control}
              rules={FormRules().required('Please select a due date')}
            />
          </FormSection>
        </Row>
      </Form>

      <Buttons>
        <TextButton onClick={closeModal} disabled={loading}>
          Cancel
        </TextButton>
        <ButtonPrimary onClick={handleFormSubmit} loading={loading}>
          Edit
        </ButtonPrimary>
      </Buttons>
    </Content>
  );
};

export default EditSprintModal;
