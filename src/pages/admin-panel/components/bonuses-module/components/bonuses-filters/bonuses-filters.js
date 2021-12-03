import React, { useEffect, useMemo } from 'react';
import { func } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { Form, SearchInput, AutocompleteInput } from './styled-components';
import { handleUsersGet } from '../../../../../../store/users/thunk';
import {
  makeSelectUsers,
  selectUsersInitLoading,
} from '../../../../../../store/users/selectors';
import useEffectAfterMount from '../../../../../../hooks/use-effect-after-mount';

const MIN_SEARCH_VALUE = 3;

const BonusesFilters = ({ onSubmit }) => {
  const dispatch = useDispatch();

  const { control, handleSubmit, watch } = useFormContext();

  const userIdValue = watch('userId');

  const selectUsers = useMemo(makeSelectUsers, []);

  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersInitLoading);

  useEffect(() => {
    dispatch(
      handleUsersGet({
        // { page: -1 } means disable pagination
        params: { sort: 'name', page: -1 },
      }),
    );
  }, [dispatch]);

  const handleFormSubmit = handleSubmit(({ search, userId }) => {
    const data = {
      ...(search.length >= MIN_SEARCH_VALUE && { search }),
      ...(search === '' && { search: '' }),
      userId,
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
  }, [userIdValue]);

  const usersList = useMemo(
    () => users.map((user) => ({ id: user._id, label: user.name })),
    [users],
  );

  return (
    <Form>
      <SearchInput
        name="search"
        control={control}
        onKeyPress={onPressEnter}
        size="small"
        disabled={!userIdValue}
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

      <AutocompleteInput
        data={usersList}
        control={control}
        name="userId"
        label="User"
        size="small"
        disabled={loading}
        fullWidth={false}
      />
    </Form>
  );
};

BonusesFilters.propTypes = {
  onSubmit: func.isRequired,
};

export default React.memo(BonusesFilters);
