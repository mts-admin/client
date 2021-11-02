import React from 'react';
import { string, object, bool } from 'prop-types';
import { Controller } from 'react-hook-form';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import * as R from 'ramda';

const ControlledDatePicker = ({
  name,
  label,
  rules,
  control,
  clearable,
  defaultValue,
  ...rest
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    defaultValue={defaultValue}
    render={({ field, fieldState }) => (
      <MobileDatePicker
        {...field}
        {...rest}
        clearable={clearable}
        label={label}
        inputFormat="dd/LL/yyyy"
        renderInput={(params) => (
          <TextField
            {...params}
            error={R.hasPath(['error', 'message'], fieldState)}
            helperText={R.path(['error', 'message'], fieldState)}
          />
        )}
      />
    )}
  />
);

ControlledDatePicker.defaultProps = {
  rules: {},
  defaultValue: '',
  clearable: true,
};

ControlledDatePicker.propTypes = {
  control: object.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  rules: object,
  defaultValue: string,
  clearable: bool,
};

export default React.memo(ControlledDatePicker);
