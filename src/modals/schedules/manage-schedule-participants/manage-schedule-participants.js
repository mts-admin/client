import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

import { handleScheduleGet } from '../../../store/schedules/thunk';
import { clearCurrentSchedule } from '../../../store/schedules/actions';
import { selectModalPayload } from '../../modal-reducer';
import {
  selectSchedulesLoading,
  selectCurrentSchedule,
} from '../../../store/schedules/selectors';
import { Title, Content, Description } from './styled-components';
import ContentSection from '../../../components/content-section';
import InviteParticipantForm from './components/invite-participant-form';
import ParticipantItem from './components/participant-item';

const ManageScheduleParticipantsModal = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectSchedulesLoading);
  const schedule = useSelector(selectCurrentSchedule);
  const { scheduleId } = useSelector(selectModalPayload);

  useEffect(() => {
    dispatch(handleScheduleGet(scheduleId));

    return () => dispatch(clearCurrentSchedule());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasParticipants = schedule?.participants?.length > 0;

  return (
    <Content>
      <Title>Manage participants</Title>

      {loading && <CircularProgress />}

      <InviteParticipantForm loading={loading} scheduleId={scheduleId} />

      <ContentSection title="Participants">
        {schedule?.participants?.map(({ user, permissions }) => (
          <ParticipantItem
            key={user.id}
            user={user}
            permissions={permissions}
            scheduleId={scheduleId}
            disabled={loading}
          />
        ))}

        {!hasParticipants && (
          <Description>You haven&#39;t invited any user yet!</Description>
        )}
      </ContentSection>
    </Content>
  );
};

export default ManageScheduleParticipantsModal;
