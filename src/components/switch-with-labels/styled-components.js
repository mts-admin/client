import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';

export const StyledGrid = styled(Grid)`
  display: flex;
`;

export const StyledSwitch = styled(Switch)`
  .PrivateSwitchBase-root {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
