import React, { useMemo } from 'react';
import { func, shape, string } from 'prop-types';
import { useForm } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import {
  Form,
  SearchInput,
  SelectInput,
  SelectWrapper,
} from './styled-components';
import {
  NOTES_SORT_VALUE,
  NOTES_TYPE_VALUE,
} from '../../../../../constants/notes';
import useEffectAfterMount from '../../../../../hooks/use-effect-after-mount';

const MIN_SEARCH_VALUE = 3;

export const NotesFilters = React.memo(({ onSubmit, defaultValues }) => {
  const { control, handleSubmit, watch } = useForm({ defaultValues });

  const [sortValue, typeValue] = watch(['sort', 'type']);

  const handleFormSubmit = handleSubmit(({ search, sort, type }) => {
    const data = {
      sort,
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
  }, [sortValue, typeValue]);

  const notesSortList = useMemo(() => Object.values(NOTES_SORT_VALUE), []);
  const notesTypeList = useMemo(() => Object.values(NOTES_TYPE_VALUE), []);

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

      <SelectWrapper>
        <SelectInput
          data={notesSortList}
          control={control}
          name="sort"
          label="Sort by date"
          size="small"
        />
        <SelectInput
          data={notesTypeList}
          control={control}
          name="type"
          label="Type"
          size="small"
        />
      </SelectWrapper>
    </Form>
  );
});

NotesFilters.propTypes = {
  onSubmit: func.isRequired,
  defaultValues: shape({
    search: string.isRequired,
    sort: string.isRequired,
    type: string.isRequired,
  }).isRequired,
};
