import styled from 'styled-components';
import MuiButton from '@mui/material/Button';

export const Button = styled(MuiButton)`
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;
