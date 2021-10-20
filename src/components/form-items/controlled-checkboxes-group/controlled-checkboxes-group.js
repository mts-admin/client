import React from 'react';
import { arrayOf, shape, string, bool, object } from 'prop-types';
import { Controller } from 'react-hook-form';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { Group } from './styled-components';

const ControlledCheckboxesGroup = ({ data, control, disabled, size }) => (
  <Group>
    {data.map(({ value, label }) => (
      <FormControlLabel
        key={value}
        control={
          <Controller
            name={`checkboxes.${value}`}
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value || false}
                onChange={(e) => field.onChange(e.target.checked)}
                size={size}
                disabled={disabled}
              />
            )}
          />
        }
        label={label}
      />
    ))}
  </Group>
);

ControlledCheckboxesGroup.propTypes = {
  data: arrayOf(
    shape({
      value: string.isRequired,
      label: string.isRequired,
    }),
  ).isRequired,
  control: object.isRequired,
  disabled: bool,
  size: string,
};

ControlledCheckboxesGroup.defaultProps = {
  disabled: false,
  size: 'normal',
};

export default ControlledCheckboxesGroup;
