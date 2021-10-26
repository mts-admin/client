import styled from 'styled-components';
import Button from '@mui/material/Button';
import MuiPagination from '@mui/lab/Pagination';

import { SimpleTabs } from '../../components/tabs';

export const SchedulesPageContent = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    flex-direction: column;

    button {
      align-self: flex-end;
    }
  }
`;

export const Tabs = styled(SimpleTabs)`
  width: 75%;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;

  .MuiTab-root {
    flex-grow: 1;
    max-width: 100%;
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 100%;
    margin-bottom: 16px;
  }
`;

export const ContentWrapper = styled.div`
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

export const CreateButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.secondaryBlack};

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGreySecondary};
  }
`;
