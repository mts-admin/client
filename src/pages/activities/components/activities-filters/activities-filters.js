import React, { useMemo } from 'react';
import { func } from 'prop-types';
import { useFormContext } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { Form, SearchInput, SelectInput } from './styled-components';
import useEffectAfterMount from '../../../../hooks/use-effect-after-mount';
import { VIEWED_FILTER_VALUE } from '../../../../constants/general';

const MIN_SEARCH_VALUE = 3;

const ActivitiesFilters = ({ onSubmit }) => {
  const { control, handleSubmit, watch } = useFormContext();

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

  const activitiesTypeList = useMemo(
    () => Object.values(VIEWED_FILTER_VALUE),
    [],
  );

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
        data={activitiesTypeList}
        control={control}
        name="type"
        label="Type"
        size="small"
      />
    </Form>
  );
};

ActivitiesFilters.propTypes = {
  onSubmit: func.isRequired,
};

export default React.memo(ActivitiesFilters);
