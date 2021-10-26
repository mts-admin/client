import styled from 'styled-components';
import MuiButton from '@mui/material/Button';

export const Button = styled(MuiButton)`
  background: linear-gradient(135deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 0;
  color: ${({ theme }) => theme.colors.white};
  padding: 10px 25px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;
