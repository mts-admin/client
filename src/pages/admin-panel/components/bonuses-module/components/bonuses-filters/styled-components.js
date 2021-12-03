import styled from 'styled-components';

import {
  ControlledInput,
  ControlledAutocomplete,
} from '../../../../../../components/form-items';

export const Form = styled.form`
  display: flex;
  flex-grow: 1;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

export const SearchInput = styled(ControlledInput)`
  width: 50%;
  margin-right: 16px;

  &.MuiFormControl-root {
    margin-bottom: 0;
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 60%;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
    margin-right: 0;

    &.MuiFormControl-root {
      margin-bottom: 16px;
    }
  }
`;

export const AutocompleteInput = styled(ControlledAutocomplete)`
  width: 25%;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: auto;
    flex-grow: 1;
  }
`;
