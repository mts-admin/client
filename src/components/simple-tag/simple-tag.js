import React from 'react';
import { node, oneOf, string } from 'prop-types';

import { Tag } from './styled-components';

const SimpleTag = ({ type, color, children }) => (
  <Tag type={type} color={color}>
    {children}
  </Tag>
);

SimpleTag.defaultProps = {
  type: 'contained',
};

SimpleTag.propTypes = {
  type: oneOf(['contained', 'outlined']),
  color: string.isRequired,
  children: node.isRequired,
};

export default SimpleTag;
