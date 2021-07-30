import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Loader = styled(CircularProgress)`
  color: ${({ theme }) => theme.colors.gold};
`;
