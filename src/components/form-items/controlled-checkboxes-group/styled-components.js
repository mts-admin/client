import styled, { css } from 'styled-components';
import MuiFormControlLabel from '@mui/material/FormControlLabel';

export const Group = styled.div``;

export const FormControlLabel = styled(MuiFormControlLabel)`
  .MuiSvgIcon-root {
    ${({ error }) =>
      error === 'true' &&
      css`
        fill: ${({ theme }) => theme.colors.error};
      `}
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSize.smallest};
  margin: 0 14px;
`;
