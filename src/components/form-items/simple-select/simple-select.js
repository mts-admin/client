import React from 'react';
import {
  string,
  arrayOf,
  shape,
  oneOfType,
  number,
  bool,
  func,
} from 'prop-types';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const SimpleSelect = ({
  data,
  value,
  onChange,
  name,
  label,
  size,
  fullWidth,
  ...rest
}) => (
  <FormControl fullWidth={fullWidth} {...rest}>
    <InputLabel id={`${name}-select-label`} size={size}>
      {label}
    </InputLabel>
    <Select
      value={value}
      onChange={onChange}
      label={label}
      size={size}
      labelId={`${name}-select-label`}
    >
      {data.map((elem) => (
        <MenuItem key={elem.value} value={elem.value}>
          {elem.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

SimpleSelect.defaultProps = {
  fullWidth: false,
  size: 'small',
};

SimpleSelect.propTypes = {
  data: arrayOf(
    shape({
      value: oneOfType([string, number]).isRequired,
      label: string.isRequired,
    }),
  ).isRequired,
  name: string.isRequired,
  label: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  fullWidth: bool,
  size: string,
};

export default SimpleSelect;
