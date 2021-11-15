import React from 'react';
import { node } from 'prop-types';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { Button } from './styled-components';

const BackButton = ({ children, ...rest }) => (
  <Button variant="text" {...rest}>
    <ArrowBackIosNewIcon />
    {children}
  </Button>
);

BackButton.propTypes = {
  children: node.isRequired,
};

export default BackButton;
