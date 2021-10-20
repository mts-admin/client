import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';

export const Button = styled(MuiButton)`
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;
