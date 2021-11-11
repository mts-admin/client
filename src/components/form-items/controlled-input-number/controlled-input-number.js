import React, { useState } from 'react';
import { string, object, bool } from 'prop-types';
import { Controller } from 'react-hook-form';
import * as R from 'ramda';

import { TextField } from './styled-components';

const ControlledInputNumber = ({
  name,
  label,
  rules,
  control,
  variant,
  fullWidth,
  defaultValue,
  ...rest
}) => {
  const [value, setValue] = useState('');

  const onChange = (callback) => (event) => {
    callback(event);
    setValue(event.target.value);
  };
  const onBlur = (event) =>
    setValue(Math.abs(parseFloat(event.target.value).toFixed(2)) || '0');

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          value={value || field.value}
          onChange={onChange(field.onChange)}
          onBlur={onBlur}
          label={label}
          fullWidth={fullWidth}
          variant={variant}
          error={R.hasPath(['error', 'message'], fieldState)}
          helperText={R.path(['error', 'message'], fieldState)}
          autoComplete="off"
        />
      )}
    />
  );
};

ControlledInputNumber.defaultProps = {
  variant: 'outlined',
  defaultValue: '',
  rules: {},
  fullWidth: true,
};

ControlledInputNumber.propTypes = {
  control: object.isRequired,
  name: string.isRequired,
  label: string,
  rules: object,
  variant: string,
  defaultValue: string,
  fullWidth: bool,
};

export default ControlledInputNumber;
