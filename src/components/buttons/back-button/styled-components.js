import styled from 'styled-components';
import MuiButton from '@mui/material/Button';

export const Button = styled(MuiButton)`
  padding: 2px;
  min-width: 0;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  text-transform: capitalize;

  .MuiSvgIcon-root {
    font-size: 14px;
    margin-right: 2px;
  }
`;
