import styled from 'styled-components';

import { ButtonPrimary } from '../../../components/buttons';

export const RegisterContent = styled.section`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.h1};
  margin-bottom: 4px;
  font-weight: 500;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-grow: 1;
  }
`;

export const Text = styled.p`
  margin-bottom: 24px;
`;

export const TextBold = styled.span`
  font-weight: 700;
`;

export const SubmitButton = styled(ButtonPrimary)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: auto;
  }
`;
