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
