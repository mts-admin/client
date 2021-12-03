import React from 'react';
import { func } from 'prop-types';
import { useFormContext } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { Form, SearchInput, DateWrapper } from './styled-components';
import { ControlledDateRangePicker } from '../../../../components/form-items';

const MIN_SEARCH_VALUE = 3;

export const FinanceFilters = ({ onSubmit }) => {
  const { control, handleSubmit } = useFormContext();

  const handleFormSubmit = handleSubmit(({ search, dateRange }) => {
    const [start, end] = dateRange;

    const data = {
      ...(search.length >= MIN_SEARCH_VALUE && { search }),
      ...(search === '' && { search: '' }),
      ...(start && { start: start.toString() }),
      end: end ? end.endOf('day').toString() : null,
    };

    onSubmit(data);
  });

  const onPressEnter = (event) => {
    if (event.key === 'Enter') {
      handleFormSubmit();
    }
  };

  return (
    <Form>
      <SearchInput
        name="search"
        control={control}
        onKeyPress={onPressEnter}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleFormSubmit}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <DateWrapper>
        <ControlledDateRangePicker
          name="dateRange"
          control={control}
          onClose={handleFormSubmit}
          clearable={false}
          size="small"
        />
      </DateWrapper>
    </Form>
  );
};

FinanceFilters.propTypes = {
  onSubmit: func.isRequired,
};
