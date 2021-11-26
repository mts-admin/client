import React from 'react';

import { Content } from './styled-components';
import GeneralInfoForm from './components/general-info-form';
import ChangeEmailForm from './components/change-email-form';
import ChangePasswordForm from './components/change-password-form';

const SettingsPage = () => (
  <Content>
    <GeneralInfoForm />
    <ChangeEmailForm />
    <ChangePasswordForm />
  </Content>
);

export default SettingsPage;
