import React from 'react';
import { string, object, bool } from 'prop-types';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import * as R from 'ramda';

import { TextField } from './styled-components';

const ControlledTagsInput = ({
  name,
  label,
  rules,
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
      <Autocomplete
        {...field}
        {...rest}
        multiple
        freeSolo
        options={[]}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            fullWidth={fullWidth}
            error={R.hasPath(['error', 'message'], fieldState)}
            helperText={R.path(['error', 'message'], fieldState)}
          />
        )}
      />
    )}
  />
);

ControlledTagsInput.defaultProps = {
  defaultValue: [],
  rules: {},
  fullWidth: true,
};

ControlledTagsInput.propTypes = {
  control: object.isRequired,
  name: string.isRequired,
  label: string,
  rules: object,
  defaultValue: string,
  fullWidth: bool,
};

export default ControlledTagsInput;
