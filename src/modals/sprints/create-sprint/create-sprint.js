import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { DateTime } from 'luxon';

import {
  Content,
  Title,
  Row,
  Form,
  FormSection,
  Buttons,
} from './styled-components';
import { handleSprintCreate } from '../../../store/sprints/thunk';
import { selectSprintsLoading } from '../../../store/sprints/selectors';
import { closeCurrentModal } from '../../modal-reducer';
import {
  ControlledInput,
  ControlledSelect,
  ControlledDatePicker,
} from '../../../components/form-items';
import { ButtonPrimary, TextButton } from '../../../components/buttons';
import FormRules from '../../../utils/form-input-rules';
import { SPRINT_PRIORITY } from '../../../constants/sprints';

const CreateSprintModal = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectSprintsLoading);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: SPRINT_PRIORITY.LOW.value,
      dueDate: DateTime.now(),
    },
  });

  const closeModal = () => dispatch(closeCurrentModal());

  const handleFormSubmit = handleSubmit((values) => {
    const data = {
      ...values,
      dueDate: values.dueDate.endOf('day').toString(),
    };
    dispatch(handleSprintCreate(data, closeModal));
  });

  return (
    <Content>
      <Title>Create sprint</Title>

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
              shouldDisableDate={(date) =>
                date < DateTime.now().minus({ days: 1 })
              }
            />
          </FormSection>
        </Row>
      </Form>

      <Buttons>
        <TextButton onClick={closeModal} disabled={loading}>
          Cancel
        </TextButton>
        <ButtonPrimary onClick={handleFormSubmit} loading={loading}>
          Create
        </ButtonPrimary>
      </Buttons>
    </Content>
  );
};

export default CreateSprintModal;
