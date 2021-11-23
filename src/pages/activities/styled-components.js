import styled from 'styled-components';
import MuiPagination from '@mui/material/Pagination';

import Timer from './components/timer';
import { SimpleTabs } from '../../components/tabs';

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Header = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    flex-wrap: wrap;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;

export const Description = styled.p`
  width: 30%;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 100%;
    margin-bottom: 16px;
    text-align: center;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: none;
  }
`;

export const StyledTimer = styled(Timer)`
  width: 40%;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 50%;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
    margin-bottom: 16px;
  }
`;

export const RestCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  text-align: right;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    margin-left: auto;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
    margin-left: 0;
  }
`;

export const RestCountLabel = styled.p`
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.small};
`;

export const RestCountValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: 500;
`;

export const Tabs = styled(SimpleTabs)`
  width: 100%;
  margin-bottom: 24px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;

  .MuiTab-root {
    flex-grow: 1;
    max-width: 100%;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    .MuiTab-root {
      min-width: auto;
    }
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
