import styled from 'styled-components';

import {
  ControlledInput,
  ControlledSelect,
} from '../../../../../components/form-items';

export const Form = styled.form`
  display: flex;
  flex-grow: 1;
  margin-right: 16px;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    flex-direction: column;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-right: 0;
  }
`;

export const SearchInput = styled(ControlledInput)`
  width: 40%;
  margin-right: 16px;

  &.MuiFormControl-root {
    margin-bottom: 0;
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 100%;

    &.MuiFormControl-root {
      margin-bottom: 16px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-right: 0;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  width: 45%;

  ${({ theme }) => theme.breakpoints.down('xl')} {
    width: 60%;
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 100%;
  }
`;

export const SelectInput = styled(ControlledSelect)`
  &:not(:last-child) {
    margin-right: 16px;
  }

  &.MuiFormControl-root {
    margin-bottom: 0;
  }
`;
