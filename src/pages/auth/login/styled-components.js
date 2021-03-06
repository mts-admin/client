import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ButtonPrimary } from '../../../components/buttons';

export const LoginPageContent = styled.section`
  ${({ theme }) => theme.breakpoints.down('md')} {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.h1};
  margin-bottom: 24px;
  font-weight: 500;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-grow: 1;
  }
`;

export const ForgotPasswordLink = styled(Link)`
  align-self: flex-end;
  color: inherit;
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.fontSize.small};
`;

export const SubmitButton = styled(ButtonPrimary)`
  padding: 10px 0;
  ${({ theme }) => theme.breakpoints.down('md')} {
    margin-top: auto;
  }
`;
