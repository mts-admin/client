import styled from 'styled-components';
import { ButtonPrimary } from '../../../../components/buttons';

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  padding: 40px 15%;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    padding: 30px 10%;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 30px 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: 600;
  margin-bottom: 20px;
`;

export const SubmitButton = styled(ButtonPrimary)`
  align-self: flex-end;
  margin-top: 16px;
  padding: 6px 16px;
`;
