import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';

export const Content = styled.section``;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  margin-bottom: 16px;
  font-weight: 600;
`;

export const ErrorMessage = styled(Alert)`
  width: 90%;
  margin: 0 auto;
`;
