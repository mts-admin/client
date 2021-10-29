import React from 'react';
import {
  arrayOf,
  shape,
  string,
  bool,
  object,
  oneOfType,
  number,
} from 'prop-types';
import { Controller } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import * as R from 'ramda';

import { Group, ErrorMessage, FormControlLabel } from './styled-components';

const ControlledCheckboxesGroup = ({
  data,
  name,
  control,
  rules,
  defaultValue,
  labelPlacement,
  disabled,
  size,
}) => (
  <Group>
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <>
          {data.map((elem) => (
            <FormControlLabel
              key={elem.value}
              label={elem.label}
              labelPlacement={labelPlacement}
              error={String(R.hasPath(['error', 'message'], fieldState))}
              control={
                <Checkbox
                  checked={field.value?.includes(elem.value)}
                  onChange={() =>
                    field.onChange(
                      R.symmetricDifference(field.value, [elem.value]),
                    )
                  }
                  disabled={disabled}
                  size={size}
                />
              }
            />
          ))}
          {R.hasPath(['error', 'message'], fieldState) && (
            <ErrorMessage>
              {R.path(['error', 'message'], fieldState)}
            </ErrorMessage>
          )}
        </>
      )}
    />
  </Group>
);

ControlledCheckboxesGroup.propTypes = {
  data: arrayOf(
    shape({
      value: oneOfType([string, number]).isRequired,
      label: string.isRequired,
    }),
  ).isRequired,
  control: object.isRequired,
  name: string.isRequired,
  rules: object,
  defaultValue: arrayOf(string),
  labelPlacement: string,
  disabled: bool,
  size: string,
};

ControlledCheckboxesGroup.defaultProps = {
  disabled: false,
  size: 'normal',
  defaultValue: [],
  rules: {},
};

export default React.memo(ControlledCheckboxesGroup);
