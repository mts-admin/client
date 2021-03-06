import React from 'react';
import {
  string,
  object,
  arrayOf,
  shape,
  oneOfType,
  number,
  bool,
} from 'prop-types';
import { Controller } from 'react-hook-form';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import * as R from 'ramda';

const ControlledSelect = ({
  data,
  name,
  label,
  rules,
  size,
  control,
  fullWidth,
  defaultValue,
  ...rest
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    defaultValue={defaultValue}
    render={({ field, fieldState }) => (
      <FormControl fullWidth={fullWidth} {...rest}>
        {label && (
          <InputLabel
            id={`${name}-controlled-select-label`}
            error={R.hasPath(['error', 'message'], fieldState)}
            size={size}
          >
            {label}
          </InputLabel>
        )}
        <Select
          {...field}
          label={label}
          size={size}
          labelId={`${name}-controlled-select-label`}
          error={R.hasPath(['error', 'message'], fieldState)}
        >
          {data.map((elem) => (
            <MenuItem key={elem.value} value={elem.value}>
              {elem.label}
            </MenuItem>
          ))}
        </Select>
        {R.hasPath(['error', 'message'], fieldState) && (
          <FormHelperText error style={{ marginLeft: 14 }}>
            {R.path(['error', 'message'], fieldState)}
          </FormHelperText>
        )}
      </FormControl>
    )}
  />
);

ControlledSelect.defaultProps = {
  defaultValue: '',
  rules: {},
  fullWidth: true,
};

ControlledSelect.propTypes = {
  data: arrayOf(
    shape({
      value: oneOfType([string, number]).isRequired,
      label: string.isRequired,
    }),
  ).isRequired,
  control: object.isRequired,
  name: string.isRequired,
  label: string,
  rules: object,
  defaultValue: string,
  fullWidth: bool,
  size: string,
};

export default React.memo(ControlledSelect);
