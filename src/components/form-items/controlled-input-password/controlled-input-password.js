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
  fullWidth,
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
  rules: {},
  fullWidth: true,
};

ControlledInputPassword.propTypes = {
  control: object.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  rules: object,
  variant: string,
  defaultValue: string,
  fullWidth: bool,
};

export default ControlledInputPassword;
