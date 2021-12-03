import React from 'react';

import useResetPasswordContainer from './container';
import { ControlledInputPassword } from '../../../components/form-items';
import {
  ResetPasswordContent,
  SubmitButton,
  Title,
  Form,
} from './styled-components';
import FormRules from '../../../utils/form-input-rules';

const ResetPasswordPage = () => {
  const { control, onSubmit, loading } = useResetPasswordContainer();

  return (
    <ResetPasswordContent>
      <Title>Set new password</Title>

      <Form onSubmit={onSubmit}>
        <ControlledInputPassword
          name="password"
          label="Password"
          control={control}
          rules={FormRules()
            .minLength(8, 'Password must be at least 8 characters long')
            .required('Please enter your password')}
        />

        <ControlledInputPassword
          name="passwordConfirm"
          label="Password confirm"
          control={control}
          rules={FormRules()
            .minLength(8, 'Password must be at least 8 characters long')
            .required('Please confirm your password')}
        />

        <SubmitButton loading={loading} type="submit">
          Save &#38; Login
        </SubmitButton>
      </Form>
    </ResetPasswordContent>
  );
};

export default ResetPasswordPage;
