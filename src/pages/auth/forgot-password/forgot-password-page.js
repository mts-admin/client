import React from 'react';

import useForgotPasswordPageContainer from './container';
import { ForgotPasswordContent } from './styled-components';
import { ForgotPasswordForm, ForgotPasswordSent } from './components';

const ForgotPasswordPage = () => {
  const { onSubmit, control, loading, emailSentTo } =
    useForgotPasswordPageContainer();

  return (
    <ForgotPasswordContent>
      {emailSentTo ? (
        <ForgotPasswordSent emailSentTo={emailSentTo} />
      ) : (
        <ForgotPasswordForm
          onSubmit={onSubmit}
          control={control}
          loading={loading}
        />
      )}
    </ForgotPasswordContent>
  );
};

export default ForgotPasswordPage;
