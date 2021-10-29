import React from 'react';
import { string, bool } from 'prop-types';

import { Message, Title, Description } from './styled-components';

const SimpleMessage = ({ title, description, error }) => (
  <Message error={error}>
    <Title>{title}</Title>
    {description && <Description>{description}</Description>}
  </Message>
);

SimpleMessage.propTypes = {
  title: string.isRequired,
  description: string,
  error: bool,
};

export default SimpleMessage;
