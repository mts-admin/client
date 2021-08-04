import React from 'react';
import { node } from 'prop-types';

import { Button } from './styled-components';

const TextButton = ({ children, ...rest }) => (
  <Button {...rest}>{children}</Button>
);

TextButton.propTypes = {
  children: node.isRequired,
};

export default TextButton;
