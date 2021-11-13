import styled from 'styled-components';

import { SimpleTabs } from '../../components/tabs';

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
