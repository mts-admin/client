import styled from 'styled-components';

import { ControlledInput } from '../../../../components/form-items';

export const Form = styled.form`
  display: flex;
  margin-right: 16px;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    margin-right: 0;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    margin-bottom: 16px;
  }
`;

export const SearchInput = styled(ControlledInput)`
  margin-right: 16px;

  &.MuiFormControl-root {
    margin-bottom: 0;
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    &.MuiFormControl-root {
      margin-bottom: 16px;
    }
  }
`;

export const DateWrapper = styled.div`
  width: 40%;
  min-width: 255px;
  flex-shrink: 0;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`;
