import styled from 'styled-components';

import { ButtonPrimary } from '../../../../components/buttons';

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Header = styled.section`
  display: flex;
  margin-bottom: 16px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column-reverse;
  }
`;

export const Description = styled.p`
  margin: auto;
  font-size: ${({ theme }) => theme.fontSize.h2};
  text-align: center;
`;

export const ButtonAdd = styled(ButtonPrimary)`
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
