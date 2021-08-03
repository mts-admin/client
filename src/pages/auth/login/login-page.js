import React from 'react';

import useLoginPageContainer from './container';
import {
  ControlledInput,
  ControlledInputPassword,
} from '../../../components/form-items';
import {
  ForgotPasswordLink,
  LoginPageContent,
  SubmitButton,
  Title,
  Form,
} from './styled-components';
import { ROUTE } from '../../../routes/constants';
import FormRules from '../../../utils/form-input-rules';

const LoginPage = () => {
  const { control, onSubmit, loading } = useLoginPageContainer();

  return (
    <LoginPageContent>
      <Title>Login</Title>

      <Form onSubmit={onSubmit}>
        <ControlledInput
          name="email"
          label="Email"
          type="email"
          control={control}
          rules={FormRules().email().required('Please enter your email')}
        />

        <ControlledInputPassword
          name="password"
          label="Password"
          control={control}
          rules={FormRules()
            .minLength(8, 'Password must be at least 8 characters long')
            .required('Please enter your password')}
        />

        <ForgotPasswordLink to={ROUTE.FORGOT_PASSWORD}>
          Forgot password?
        </ForgotPasswordLink>

        <SubmitButton loading={loading} type="submit">
          Login
        </SubmitButton>
      </Form>
    </LoginPageContent>
  );
};

export default LoginPage;
