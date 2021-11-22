import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import * as R from 'ramda';

import { handleScheduleGet } from '../../../store/schedules/thunk';
import { clearCurrentSchedule } from '../../../store/schedules/actions';
import { selectModalPayload } from '../../modal-reducer';
import {
  selectSchedulesLoading,
  selectSchedulesError,
  selectCurrentSchedule,
} from '../../../store/schedules/selectors';
import { Title, Text, Content, ErrorMessage } from './styled-components';
import ContentSection from '../../../components/content-section';
import { UserCard } from '../../../components/cards';
import { getErrorMessage, getComponentState } from '../../../utils/general';
import { formatISO } from '../../../utils/date';
import { getSchedulePermissionsLabels } from '../../../utils/permissions';
import { COMPONENT_STATE } from '../../../constants/general';

const ScheduleDetailsModal = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectSchedulesLoading);
  const error = useSelector(selectSchedulesError);
  const schedule = useSelector(selectCurrentSchedule);
  const { scheduleId } = useSelector(selectModalPayload);

  const componentState = useMemo(
    () => getComponentState(loading, error),
    [loading, error],
  );

  const hasParticipants = schedule?.participants?.length > 0;

  useEffect(() => {
    dispatch(handleScheduleGet(scheduleId));

    return () => dispatch(clearCurrentSchedule());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return R.cond([
    [R.equals(COMPONENT_STATE.LOADING), () => <CircularProgress />],
    [
      R.equals(COMPONENT_STATE.SUCCESS),
      () => (
        <Content>
          <Title>Schedule details</Title>

          <ContentSection title="Name">
            <Text>{schedule.name}</Text>
          </ContentSection>

          <ContentSection title="Description">
            <Text>{schedule.description || '-'}</Text>
          </ContentSection>

          <ContentSection title="Creation date">
            <Text>
              {schedule.createdAt
                ? formatISO(schedule.createdAt, 'D HH:mm')
                : '-'}
            </Text>
          </ContentSection>

          <ContentSection title="Owner">
            <UserCard
              name={schedule?.owner?.name}
              image={schedule?.owner?.avatar}
            />
          </ContentSection>

          {hasParticipants && (
            <ContentSection title="Participants">
              {schedule.participants.map(({ user, permissions }) => (
                <UserCard
                  key={user.id}
                  name={user.name}
                  image={user.avatar}
                  description={getSchedulePermissionsLabels(permissions)}
                />
              ))}
            </ContentSection>
          )}
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

export default ScheduleDetailsModal;
