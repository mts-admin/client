import styled from 'styled-components';
import MuiPagination from '@material-ui/lab/Pagination';

import { SimpleTabs } from '../../components/tabs';

export const SchedulesPageContent = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  ${({ theme }) => theme.breakpoints.down('md')} {
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

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 100%;
    margin-bottom: 16px;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  align-content: flex-start;
  flex-grow: 1;
  margin-bottom: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.down('md')} {
    grid-template-columns: 1fr 1fr;
  }

  ${({ theme }) => theme.breakpoints.down('xs')} {
    grid-template-columns: 1fr;
  }
`;

export const Pagination = styled(MuiPagination)`
  margin: auto auto 0 auto;
`;
