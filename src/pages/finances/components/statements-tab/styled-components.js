import styled from 'styled-components';

import { ButtonPrimary } from '../../../../components/buttons';

export const Content = styled.section`
  overflow-x: auto;
  padding-top: 6px;
`;

export const TableWrapper = styled.section`
  border-radius: ${({ theme }) => theme.borderRadius.small};
  overflow: hidden;
`;

export const Controls = styled.section`
  display: flex;
  margin-bottom: 16px;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    flex-direction: column;
  }
`;

export const AddButton = styled(ButtonPrimary)`
  padding: 6px 24.5px;
  margin-left: auto;
  white-space: nowrap;
`;
