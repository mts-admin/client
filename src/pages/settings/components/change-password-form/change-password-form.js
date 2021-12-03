import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { handleUpdateMyPassword } from '../../../../store/auth/thunk';
import FormSection from '../form-section/form-section';
import { ControlledInputPassword } from '../../../../components/form-items';
import FormRules from '../../../../utils/form-input-rules';

const ChangePasswordForm = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm();

  const [loading, setLoading] = useState(false);

  const callback = () => setLoading(false);
  const successCallback = () => {
    reset({
      passwordCurrent: '',
      password: '',
      passwordConfirm: '',
    });
  };

  const handleFormSubmit = handleSubmit((values) => {
    setLoading(true);
    dispatch(handleUpdateMyPassword(values, callback, successCallback));
  });

  return (
    <FormSection
      title="Password change"
      buttonLabel="Save password"
      onSubmit={handleFormSubmit}
      loading={loading}
    >
      <ControlledInputPassword
        name="passwordCurrent"
        label="Current password"
        control={control}
        disabled={loading}
        rules={FormRules()
          .minLength(8, 'Password must be at least 8 characters long')
          .required('Current password is required!')}
      />
      <ControlledInputPassword
        name="password"
        label="New password"
        control={control}
        disabled={loading}
        rules={FormRules()
          .minLength(8, 'Password must be at least 8 characters long')
          .required('New password is required!')}
      />
      <ControlledInputPassword
        name="passwordConfirm"
        label="Confirm new password"
        control={control}
        disabled={loading}
        rules={FormRules()
          .minLength(8, 'Password must be at least 8 characters long')
          .required('Password confirm is required!')}
      />
    </FormSection>
  );
};

export default ChangePasswordForm;
