import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { handleUpdateMyEmail } from '../../../../store/auth/thunk';
import { selectAuthUser } from '../../../../store/auth/selectors';
import FormSection from '../form-section/form-section';
import {
  ControlledInput,
  ControlledInputPassword,
} from '../../../../components/form-items';
import FormRules from '../../../../utils/form-input-rules';

const ChangeEmailForm = () => {
  const dispatch = useDispatch();

  const authUser = useSelector(selectAuthUser);

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: authUser.email,
      password: '',
    },
  });

  const callback = () => setLoading(false);
  const successCallback = (data) => {
    reset({
      email: data.email,
      password: '',
    });
  };

  const handleFormSubmit = handleSubmit((values) => {
    setLoading(true);
    dispatch(handleUpdateMyEmail(values, callback, successCallback));
  });

  return (
    <FormSection
      title="Email change"
      buttonLabel="Save email"
      onSubmit={handleFormSubmit}
      loading={loading}
    >
      <ControlledInput
        name="email"
        type="email"
        label="Email"
        control={control}
        disabled={loading}
        rules={FormRules().email().required('Email is required!')}
      />
      <ControlledInputPassword
        name="password"
        label="Password"
        placeholder="Type your password to change email"
        control={control}
        disabled={loading}
        rules={FormRules()
          .minLength(8, 'Password must be at least 8 characters long')
          .required('Password is required!')}
      />
    </FormSection>
  );
};

export default ChangeEmailForm;
