import styled from 'styled-components';

import { ButtonPrimary, TextButton } from '../../../components/buttons';

export const ForgotPasswordContent = styled.section`
  font-size: ${({ theme }) => theme.fontSize.normal};
  ${({ theme }) => theme.breakpoints.down('md')} {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.h1};
  margin-bottom: 8px;
  font-weight: 500;
`;

export const Description = styled.p`
  margin-bottom: 20px;
`;

export const Text = styled.p`
  margin-bottom: 6px;
`;

export const SpanBold = styled.span`
  font-weight: 700;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-grow: 1;
  }
`;

export const SubmitButton = styled(ButtonPrimary)`
  margin-bottom: 8px;
  ${({ theme }) => theme.breakpoints.down('md')} {
    margin-top: auto;
  }
`;

export const CancelButton = styled(TextButton)`
  align-self: center;
  margin-bottom: -12px;
`;
