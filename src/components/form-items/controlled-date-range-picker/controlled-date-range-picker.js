import React from 'react';
import { string, object, array, bool } from 'prop-types';
import { Controller } from 'react-hook-form';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as R from 'ramda';

const ControlledDateRangePicker = ({
  name,
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
      <MobileDateRangePicker
        {...field}
        {...rest}
        clearable={clearable}
        inputFormat="dd/LL/yyyy"
        renderInput={(startProps, endProps) => (
          <>
            <TextField
              {...startProps}
              label="Start date"
              error={R.hasPath(['error', 'message'], fieldState)}
              helperText={R.path(['error', 'message'], fieldState)}
            />
            <Box sx={{ mx: 2 }}> - </Box>
            <TextField
              {...endProps}
              label="End date"
              error={R.hasPath(['error', 'message'], fieldState)}
              helperText={R.path(['error', 'message'], fieldState)}
            />
          </>
        )}
      />
    )}
  />
);

ControlledDateRangePicker.defaultProps = {
  rules: {},
  defaultValue: [null, null],
  clearable: true,
};

ControlledDateRangePicker.propTypes = {
  control: object.isRequired,
  name: string.isRequired,
  rules: object,
  defaultValue: array,
  clearable: bool,
};

export default React.memo(ControlledDateRangePicker);
