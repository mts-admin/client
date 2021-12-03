import React from 'react';
import { string } from 'prop-types';

import { SpanBold, Title, Text } from '../styled-components';

const ForgotPasswordSent = ({ emailSentTo }) => (
  <>
    <Title>Check your email</Title>
    <Text>
      We&#39;ve sent an email to <SpanBold>{emailSentTo}</SpanBold>. Click the
      link in the email to reset your password.
    </Text>
    <Text>
      If you don&#39;t get an email from us within few minutes please be sure to
      check your spam or junk filters.
    </Text>
  </>
);

ForgotPasswordSent.propTypes = {
  emailSentTo: string.isRequired,
};

export default ForgotPasswordSent;
