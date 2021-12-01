import styled from 'styled-components';

import { ButtonPrimary } from '../../../../components/buttons';

export const Content = styled.section``;

export const Header = styled.section`
  display: flex;
  margin-bottom: 16px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column-reverse;
  }
`;

export const ButtonInvite = styled(ButtonPrimary)`
  padding: 7.5px 20px;
  margin-left: 16px;
  flex-shrink: 0;
  white-space: nowrap;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    align-self: flex-start;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-bottom: 16px;
    margin-left: auto;
  }
`;

export const TableWrapper = styled.section`
  border-radius: ${({ theme }) => theme.borderRadius.small};
  overflow: hidden;
`;
