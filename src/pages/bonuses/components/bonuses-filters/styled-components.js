import styled from 'styled-components';

import {
  ControlledInput,
  ControlledSelect,
} from '../../../../components/form-items';

export const Form = styled.form`
  display: flex;

  &.MuiFormControl-root {
    margin-bottom: 0;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;

    &.MuiFormControl-root {
      margin-bottom: 16px;
    }
  }
`;

export const SearchInput = styled(ControlledInput)`
  margin-right: 16px;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 60%;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
    margin-right: 0;
  }
`;

export const SelectInput = styled(ControlledSelect)`
  width: 35%;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 40%;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
    margin-bottom: 16px;
  }
`;
