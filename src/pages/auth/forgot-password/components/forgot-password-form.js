import React from 'react';
import { func, object, bool } from 'prop-types';

import { useHistory } from 'react-router-dom';

import { ControlledInput } from '../../../../components/form-items';
import {
  SubmitButton,
  CancelButton,
  Description,
  Title,
  Form,
} from '../styled-components';
import FormRules from '../../../../utils/form-input-rules';

const ForgotPasswordForm = ({ onSubmit, control, loading }) => {
  const history = useHistory();
  const goBack = () => history.goBack();

  return (
    <>
      <Title>Reset password</Title>

      <Description>
        Enter your email addres and we’ll send you a link to reset your
        password.
      </Description>

      <Form onSubmit={onSubmit}>
        <ControlledInput
          name="email"
          label="Email"
          type="email"
          control={control}
          rules={FormRules().email().required('Please enter your email')}
        />

        <SubmitButton loading={loading} type="submit">
          Send recovery email
        </SubmitButton>
        <CancelButton onClick={goBack} disabled={loading}>
          Cancel
        </CancelButton>
      </Form>
    </>
  );
};

ForgotPasswordForm.propTypes = {
  onSubmit: func.isRequired,
  control: object.isRequired,
  loading: bool.isRequired,
};

export default ForgotPasswordForm;
