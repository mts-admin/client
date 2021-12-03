import React from 'react';
import { string, object, bool, arrayOf } from 'prop-types';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as R from 'ramda';

const ControlledAutocomplete = ({
  data,
  name,
  label,
  rules,
  control,
  defaultValue,
  disableClearable,
  disablePortal,
  fullWidth,
  size,
  ...rest
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    defaultValue={defaultValue}
    {...rest}
    render={({ field, fieldState }) => (
      <Autocomplete
        {...field}
        onChange={(event, value) => field.onChange(value)}
        options={data}
        disableClearable={disableClearable}
        disablePortal={disablePortal}
        fullWidth={fullWidth}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            size={size}
            error={R.hasPath(['error', 'message'], fieldState)}
            helperText={R.path(['error', 'message'], fieldState)}
          />
        )}
      />
    )}
  />
);

ControlledAutocomplete.defaultProps = {
  rules: {},
  defaultValue: '',
  fullWidth: true,
  disableClearable: true,
  disablePortal: true,
};

ControlledAutocomplete.propTypes = {
  data: arrayOf(object).isRequired,
  control: object.isRequired,
  name: string.isRequired,
  label: string,
  rules: object,
  defaultValue: string,
  disableClearable: bool,
  size: string,
  fullWidth: bool,
  disablePortal: bool,
};

export default React.memo(ControlledAutocomplete);
