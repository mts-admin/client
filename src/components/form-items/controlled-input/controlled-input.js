import React from 'react';
import { string, object, bool } from 'prop-types';
import { Controller } from 'react-hook-form';
import * as R from 'ramda';

import { TextField } from './styled-components';

const ControlledInput = ({
  name,
  label,
  type,
  rules,
  control,
  variant,
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
      <TextField
        {...field}
        {...rest}
        label={label}
        type={type}
        fullWidth={fullWidth}
        variant={variant}
        error={R.hasPath(['error', 'message'], fieldState)}
        helperText={R.path(['error', 'message'], fieldState)}
      />
    )}
  />
);

ControlledInput.defaultProps = {
  type: 'text',
  variant: 'outlined',
  defaultValue: '',
  rules: {},
  fullWidth: true,
};

ControlledInput.propTypes = {
  control: object.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  type: string,
  rules: object,
  variant: string,
  defaultValue: string,
  fullWidth: bool,
};

export default ControlledInput;
