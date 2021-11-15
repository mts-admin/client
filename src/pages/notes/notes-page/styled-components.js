import styled from 'styled-components';
import MuiPagination from '@mui/material/Pagination';

import { ButtonPrimary } from '../../../components/buttons';

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

export const AddButton = styled(ButtonPrimary)`
  padding: 6px 24.5px;
  margin-left: auto;
  white-space: nowrap;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    align-self: flex-start;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-bottom: 16px;
  }
`;

export const CardsWrapper = styled.section`
  position: relative;
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  align-content: flex-start;
  margin-bottom: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    grid-template-columns: 1fr 1fr;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    grid-template-columns: 1fr;
  }
`;

export const Pagination = styled(MuiPagination)`
  margin: auto auto 0 auto;
`;

export const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.grey};
  font-style: italic;
  text-align: center;
  margin-top: 16px;
  grid-column: 1 / 4;
`;
