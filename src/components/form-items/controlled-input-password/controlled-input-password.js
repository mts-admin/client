import React, { useState } from 'react';
import { string, object, bool } from 'prop-types';
import { Controller } from 'react-hook-form';
import { InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as R from 'ramda';

import { TextField } from './styled-components';

const ControlledInputPassword = ({
  name,
  label,
  rules,
  control,
  variant,
  disabled,
  fullWidth,
  placeholder,
  defaultValue,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          type={showPassword ? 'text' : 'password'}
          fullWidth={fullWidth}
          variant={variant}
          error={R.hasPath(['error', 'message'], fieldState)}
          helperText={R.path(['error', 'message'], fieldState)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

ControlledInputPassword.defaultProps = {
  variant: 'outlined',
  defaultValue: '',
  placeholder: '',
  rules: {},
  fullWidth: true,
  disabled: false,
};

ControlledInputPassword.propTypes = {
  control: object.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  placeholder: string,
  rules: object,
  variant: string,
  defaultValue: string,
  fullWidth: bool,
  disabled: bool,
};

export default ControlledInputPassword;
