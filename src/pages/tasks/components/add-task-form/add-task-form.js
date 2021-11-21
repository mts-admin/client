import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';

import { Form, ButtonAdd } from './styled-components';
import { handleTaskCreate } from '../../../../store/tasks/thunk';
import { ControlledInput } from '../../../../components/form-items';

const AddTaskForm = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm();

  const handleFormSubmit = handleSubmit(({ title }) => {
    const callback = () => {
      reset({ title: '' });
      setLoading(false);
    };

    if (title) {
      setLoading(true);
      dispatch(handleTaskCreate({ title }, id, callback));
    }
  });
  const onPressEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleFormSubmit();
    }
  };

  return (
    <Form>
      <ControlledInput
        name="title"
        control={control}
        onKeyPress={onPressEnter}
        inputProps={{ maxLength: 100 }}
        size="small"
      />

      <ButtonAdd onClick={handleFormSubmit} loading={loading}>
        Add task
      </ButtonAdd>
    </Form>
  );
};

export default AddTaskForm;
