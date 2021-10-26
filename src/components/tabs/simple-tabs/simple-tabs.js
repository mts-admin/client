import React from 'react';
import { string, number, func, arrayOf, oneOfType } from 'prop-types';
import Tabs from '@mui/material/Tabs';

import { Tab } from './styled-components';

const SimpleTabs = ({ value, onChange, options, ...rest }) => (
  <Tabs value={value} onChange={onChange} {...rest}>
    {options.map((option) => (
      <Tab key={option} label={option.toUpperCase()} value={option} />
    ))}
  </Tabs>
);

SimpleTabs.propTypes = {
  value: oneOfType([string, number]).isRequired,
  onChange: func.isRequired,
  options: arrayOf(string).isRequired,
};

export default SimpleTabs;
