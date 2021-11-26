import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import * as R from 'ramda';

import useRegisterContainer from './container';
import {
  ControlledInput,
  ControlledInputPassword,
} from '../../../components/form-items';
import {
  RegisterContent,
  SubmitButton,
  TextBold,
  Title,
  Text,
  Form,
} from './styled-components';
import FormRules from '../../../utils/form-input-rules';

const RegisterPage = () => {
  const { control, onSubmit, user, invitationLoading, formLoading } =
    useRegisterContainer();

  return invitationLoading ? (
    <CircularProgress />
  ) : (
    <RegisterContent>
      <Title>Register</Title>

      <Text>
        You have been invited by{' '}
        <TextBold>{R.path(['invitedBy', 'name'], user)}</TextBold> as{' '}
        <TextBold>{user.role}</TextBold>
      </Text>

      <Form onSubmit={onSubmit}>
        <ControlledInput
          name="name"
          label="Name"
          control={control}
          InputProps={{ disabled: true }}
          rules={FormRules()
            .required('Name is required!')
            .maxLength(50, 'Name must be no more than 50 characters long')}
        />

        <ControlledInput
          name="email"
          label="Email"
          control={control}
          InputProps={{ disabled: true }}
        />

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

        <SubmitButton loading={formLoading} type="submit">
          Register
        </SubmitButton>
      </Form>
    </RegisterContent>
  );
};

export default RegisterPage;
