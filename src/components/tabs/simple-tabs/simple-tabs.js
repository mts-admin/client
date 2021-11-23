import React from 'react';
import { string, number, func, arrayOf, oneOfType, shape } from 'prop-types';
import Tabs from '@mui/material/Tabs';

import { Tab } from './styled-components';

const SimpleTabs = ({ value, onChange, options, ...rest }) => (
  <Tabs value={value} onChange={onChange} {...rest}>
    {options.map((option) => (
      <Tab key={option.value} label={option.label} value={option.value} />
    ))}
  </Tabs>
);

SimpleTabs.propTypes = {
  value: oneOfType([string, number]).isRequired,
  onChange: func.isRequired,
  options: arrayOf(
    shape({
      value: string.isRequired,
      label: string.isRequired,
    }),
  ).isRequired,
};

export default SimpleTabs;
