import React, { useMemo } from 'react';
import { func } from 'prop-types';
import { useFormContext } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import {
  Form,
  SearchInput,
  SelectInput,
  SelectWrapper,
} from './styled-components';
import useEffectAfterMount from '../../../../../../hooks/use-effect-after-mount';
import {
  USER_ROLE_FILTERS,
  USER_STATUS_FILTERS,
} from '../../../../../../constants/users';

const MIN_SEARCH_VALUE = 3;

const UsersFilters = ({ onSubmit }) => {
  const { control, handleSubmit, watch } = useFormContext();

  const [statusValue, roleValue] = watch(['status', 'role']);

  const handleFormSubmit = handleSubmit(({ search, status, role }) => {
    const data = {
      ...(search.length >= MIN_SEARCH_VALUE && { search }),
      ...(search === '' && { search: '' }),
      status,
      role,
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
  }, [statusValue, roleValue]);

  const roleList = useMemo(() => Object.values(USER_ROLE_FILTERS), []);
  const statusList = useMemo(() => Object.values(USER_STATUS_FILTERS), []);

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
          data={statusList}
          control={control}
          name="status"
          label="Status"
          size="small"
        />
        <SelectInput
          data={roleList}
          control={control}
          name="role"
          label="Role"
          size="small"
        />
      </SelectWrapper>
    </Form>
  );
};

UsersFilters.propTypes = {
  onSubmit: func.isRequired,
};

export default React.memo(UsersFilters);
