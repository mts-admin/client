import styled from 'styled-components';
import MuiPagination from '@mui/material/Pagination';

import { SimpleTabs } from '../../components/tabs';

import { ButtonPrimary } from '../../components/buttons';

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
`;

export const Header = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 16px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column-reverse;
  }
`;

export const FiltersWrapper = styled.div`
  display: flex;

  .MuiFormControl-root:first-child {
    margin-right: 8px;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
    flex-direction: column;

    .MuiFormControl-root {
      width: 100%;
    }
    .MuiFormControl-root:first-child {
      margin-right: 0;
      margin-bottom: 16px;
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
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.down('xl')} {
    grid-template-columns: 1fr 1fr;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    grid-template-columns: 1fr;
  }
`;

export const AddButton = styled(ButtonPrimary)`
  padding: 6px 20px;
  margin-left: auto;
  white-space: nowrap;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-bottom: 8px;
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
