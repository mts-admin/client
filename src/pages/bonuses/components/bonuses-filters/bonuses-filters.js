import React, { useMemo } from 'react';
import { func, shape, string } from 'prop-types';
import { useForm } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { Form, SearchInput, SelectInput } from './styled-components';
import useEffectAfterMount from '../../../../hooks/use-effect-after-mount';
import { VIEWED_FILTER_VALUE } from '../../../../constants/general';

const MIN_SEARCH_VALUE = 3;

const BonusesFilters = ({ onSubmit, defaultValues }) => {
  const { control, handleSubmit, watch } = useForm({ defaultValues });

  const typeValue = watch('type');

  const handleFormSubmit = handleSubmit(({ search, type }) => {
    const data = {
      type,
      page: 1,
      ...(search.length >= MIN_SEARCH_VALUE && { search }),
      ...(search === '' && { search: '' }),
    };

    onSubmit(data);
  });

  const onPressEnter = (event) => {
    if (event.key === 'Enter') {
      handleFormSubmit();
    }
  };

  useEffectAfterMount(() => {
    handleFormSubmit();
  }, [typeValue]);

  const bonusesTypeList = useMemo(() => Object.values(VIEWED_FILTER_VALUE), []);

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

      <SelectInput
        data={bonusesTypeList}
        control={control}
        name="type"
        label="Type"
        size="small"
      />
    </Form>
  );
};

BonusesFilters.propTypes = {
  onSubmit: func.isRequired,
  defaultValues: shape({
    search: string.isRequired,
    type: string.isRequired,
  }).isRequired,
};

export default React.memo(BonusesFilters);
