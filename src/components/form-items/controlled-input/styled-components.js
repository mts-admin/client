import styled from 'styled-components';
import MuiTextField from '@mui/material/TextField';

export const TextField = styled(MuiTextField)`
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;
