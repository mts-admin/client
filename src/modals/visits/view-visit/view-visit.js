import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerIcon from '@mui/icons-material/Timer';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import * as R from 'ramda';

import {
  Content,
  Title,
  Section,
  Date,
  Item,
  ItemLabel,
  ItemsGroup,
  Status,
  Recurring,
  TimeValue,
  TimeWrapper,
  ErrorMessage,
} from './styled-components';
import { handleVisitGet } from '../../../store/visits/thunk';
import {
  selectCurrentVisit,
  selectVisitsLoading,
  selectVisitsError,
} from '../../../store/visits/selectors';
import { selectModalPayload } from '../../modal-reducer';
import {
  capitalizeFirstLetter,
  getComponentState,
  getErrorMessage,
} from '../../../utils/general';
import { formatISO } from '../../../utils/date';
import { COMPONENT_STATE } from '../../../constants/general';
import { VISIT_RECURRING, VISIT_STATUS } from '../../../constants/visits';
import { COLORS } from '../../../styles/theme';

const ViewVisitModal = () => {
  const dispatch = useDispatch();

  const { scheduleId, visitId } = useSelector(selectModalPayload);
  const visit = useSelector(selectCurrentVisit);
  const loading = useSelector(selectVisitsLoading) || R.isEmpty(visit);
  const error = useSelector(selectVisitsError);

  useEffect(() => {
    dispatch(handleVisitGet({ scheduleId, visitId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const componentState = useMemo(
    () => getComponentState(loading, error),
    [loading, error],
  );

  const notes = visit.notes || '-';
  const date = formatISO(visit.startTime, 'D');
  const recurring = VISIT_RECURRING[visit.recurring]?.label;
  const startTime = formatISO(visit.startTime, 'HH:mm');
  const endTime = formatISO(visit.endTime, 'HH:mm');
  const status = capitalizeFirstLetter(visit.status);
  const createdAt = formatISO(visit.createdAt, 'D HH:mm');
  const createdBy = visit.createdBy?.name || '-';
  const statusColor = R.cond([
    [R.equals(VISIT_STATUS.COMPLETED), () => COLORS.SUCCESS],
    [R.equals(VISIT_STATUS.CANCELLED), () => COLORS.ERROR],
    [R.equals(VISIT_STATUS.ACTIVE), () => COLORS.BLUE],
  ])(visit.status);

  return R.cond([
    [R.equals(COMPONENT_STATE.LOADING), () => <CircularProgress />],
    [
      R.equals(COMPONENT_STATE.SUCCESS),
      () => (
        <Content>
          <Title>Visit details</Title>

          <Section>
            <Item>
              <ItemLabel>Title: </ItemLabel>
              {visit.title}
            </Item>
            <Item>
              <ItemLabel>Notes: </ItemLabel>
              {notes}
            </Item>
          </Section>

          <Section>
            <ItemsGroup>
              <Date>
                <CalendarTodayIcon fontSize="20px" />
                {date}
              </Date>

              <FiberManualRecordIcon fontSize="inherit" />

              <Recurring>{recurring}</Recurring>
            </ItemsGroup>

            <ItemsGroup>
              <TimeWrapper>
                <AccessTimeIcon fontSize="20px" />
                <TimeValue>{`${startTime} - ${endTime}`}</TimeValue>
              </TimeWrapper>
              <TimeWrapper>
                <TimerIcon fontSize="20px" />
                <TimeValue>{visit.duration}</TimeValue>
              </TimeWrapper>
            </ItemsGroup>

            <Status color={statusColor}>
              <EmojiFlagsIcon color="inherit" />
              {status}
            </Status>
          </Section>

          <Section>
            <Item>
              <ItemLabel>Created at: </ItemLabel>
              {createdAt}
            </Item>
            <Item>
              <ItemLabel>Created by: </ItemLabel>
              {createdBy}
            </Item>
          </Section>
        </Content>
      ),
    ],
    [
      R.equals(COMPONENT_STATE.ERROR),
      () => (
        <ErrorMessage severity="error">{getErrorMessage(error)}</ErrorMessage>
      ),
    ],
  ])(componentState);
};

export default ViewVisitModal;
