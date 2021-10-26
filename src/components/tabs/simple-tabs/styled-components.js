import styled from 'styled-components';
import MuiTab from '@mui/material/Tab';

export const Tab = styled(MuiTab)`
  &.Mui-selected {
    color: ${({ theme }) => theme.colors.secondaryBlack};
  }
`;
