import React from 'react';
import { string, object, number, bool } from 'prop-types';
import { Controller } from 'react-hook-form';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import TextField from '@mui/material/TextField';
import * as R from 'ramda';

const ControlledTimePicker = ({
  name,
  label,
  rules,
  control,
  clearable,
  minutesStep,
  defaultValue,
  ...rest
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    defaultValue={defaultValue}
    render={({ field, fieldState }) => (
      <MobileTimePicker
        {...field}
        {...rest}
        clearable={clearable}
        ampm={false}
        label={label}
        minutesStep={minutesStep}
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

ControlledTimePicker.defaultProps = {
  rules: {},
  defaultValue: '',
  minutesStep: 5,
  clearable: true,
};

ControlledTimePicker.propTypes = {
  control: object.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  rules: object,
  minutesStep: number,
  defaultValue: string,
  clearable: bool,
};

export default React.memo(ControlledTimePicker);
