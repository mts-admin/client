import React from 'react';
import { arrayOf, shape, string, object } from 'prop-types';
import { Controller } from 'react-hook-form';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Content, Title } from './styled-components';

const ControlledRadioGroup = ({
  data,
  name,
  title,
  rules,
  control,
  defaultValue,
}) => (
  <Content>
    {title && <Title>{title}</Title>}

    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => (
        <RadioGroup
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
        >
          {data.map(({ value, label }) => (
            <FormControlLabel
              key={value}
              label={label}
              control={<Radio value={value} />}
            />
          ))}
        </RadioGroup>
      )}
    />
  </Content>
);

ControlledRadioGroup.propTypes = {
  data: arrayOf(
    shape({
      value: string.isRequired,
      label: string.isRequired,
    }),
  ).isRequired,
  control: object.isRequired,
  name: string.isRequired,
  rules: object,
  title: string,
  defaultValue: string,
};

ControlledRadioGroup.defaultProps = {
  defaultValue: '',
};

export default React.memo(ControlledRadioGroup);
