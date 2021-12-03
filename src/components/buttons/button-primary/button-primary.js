import React from 'react';
import { node, bool } from 'prop-types';

import { Button } from './styled-components';

const ButtonPrimary = ({
  children,
  disabled = false,
  loading = false,
  ...rest
}) => (
  <Button disabled={disabled || loading} {...rest}>
    {loading ? 'Loading...' : children}
  </Button>
);

ButtonPrimary.propTypes = {
  children: node.isRequired,
  disabled: bool,
  loading: bool,
};

export default ButtonPrimary;
