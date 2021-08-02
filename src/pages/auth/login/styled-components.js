import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LoginPageContent = styled.section``;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.h1};
  margin-bottom: 24px;
  font-weight: 500;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ForgotPasswordLink = styled(Link)`
  align-self: flex-end;
  color: inherit;
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.fontSize.small};
`;
