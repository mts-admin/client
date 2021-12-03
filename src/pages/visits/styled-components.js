import styled, { css } from 'styled-components';
import LinearProgress from '@mui/material/LinearProgress';

import { ButtonPrimary } from '../../components/buttons';

export const Content = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.lightGrey};
  overflow: hidden;

  .fc-timegrid-event .fc-event-main {
    padding: 0;
  }

  .fc-v-event {
    border-color: transparent;
    border: none;
  }
`;

export const Header = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AddVisitButton = styled(ButtonPrimary)`
  padding: 8px 15px;
  line-height: 1.5;
  flex-shrink: 0;
  margin-left: 8px;
`;

export const LinearLoader = styled(LinearProgress)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const EventItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 3px;

  ${({ directionColumn, backgroundColor }) =>
    directionColumn &&
    css`
      flex-direction: column;
      align-items: stretch;
      padding-top: 1px;
      padding-left: 4px;
      background-color: ${({ theme }) => theme.colors[backgroundColor]};
    `};
`;

export const EventItemTime = styled.p`
  ${({ directionColumn }) =>
    !directionColumn &&
    css`
      margin: 0 4px 0 3px;
    `}
`;

export const EventItemText = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ directionColumn }) =>
    directionColumn &&
    css`
      font-size: ${({ theme }) => theme.fontSize.smallest};
    `}
`;
