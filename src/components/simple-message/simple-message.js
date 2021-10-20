import React from 'react';
import { string } from 'prop-types';

import { Message, Title, Description } from './styled-components';

const SimpleMessage = ({ title, description }) => (
  <Message>
    <Title>{title}</Title>
    {description && <Description>{description}</Description>}
  </Message>
);

SimpleMessage.propTypes = {
  title: string.isRequired,
  description: string,
};

export default SimpleMessage;
