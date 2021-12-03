import styled from 'styled-components';
import Alert from '@mui/material/Alert';

import { TextButton } from '../../../components/buttons';

export const Content = styled.section``;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  margin-bottom: 16px;
  font-weight: 600;
`;

export const Form = styled.form``;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const CancelButton = styled(TextButton)`
  margin-right: 16px;
`;

export const ErrorMessage = styled(Alert)`
  width: 90%;
  margin: 0 auto;
`;
