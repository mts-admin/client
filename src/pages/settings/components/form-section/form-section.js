import React from 'react';
import { string, func, node, bool } from 'prop-types';

import { Content, SectionTitle, SubmitButton } from './styled-components';

const FormSection = ({ title, onSubmit, buttonLabel, loading, children }) => (
  <Content>
    <SectionTitle>{title}</SectionTitle>

    {children}

    <SubmitButton onClick={onSubmit} loading={loading}>
      {buttonLabel}
    </SubmitButton>
  </Content>
);

FormSection.propTypes = {
  title: string.isRequired,
  buttonLabel: string.isRequired,
  onSubmit: func.isRequired,
  loading: bool.isRequired,
  children: node.isRequired,
};

export default React.memo(FormSection);
