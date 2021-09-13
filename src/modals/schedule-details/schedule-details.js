import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import { handleScheduleGet } from '../../store/schedules/thunk';
import { selectModalPayload } from '../modal-reducer';
import {
  selectSchedulesLoading,
  selectSchedulesError,
  selectCurrentSchedule,
} from '../../store/schedules/selectors';
import { Title, Content } from './styled-components';
import { getErrorMessage } from '../../utils/general';

const ScheduleDetailsModal = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectSchedulesLoading);
  const error = useSelector(selectSchedulesError);
  const schedule = useSelector(selectCurrentSchedule);
  const { scheduleId } = useSelector(selectModalPayload);

  const hasParticipants = schedule?.participants?.length > 0;

  useEffect(() => {
    dispatch(handleScheduleGet(scheduleId));
  }, [scheduleId, dispatch]);

  if (error) {
    return <Alert severity="error">{getErrorMessage(error)}</Alert>;
  }

  return (
    <Content>
      <Title>Schedule details</Title>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <h3>Name</h3>
          <p>{schedule.name}</p>

          <h3>Description</h3>
          <p>{schedule.description || '-'}</p>

          <h3>Creation date</h3>
          <p>{schedule.createdAt}</p>

          <h3>Owner</h3>
          {/* here will be usercard component */}
          <div>{schedule.owner.name}</div>

          {hasParticipants && (
            <>
              <h3>Participants</h3>
              {/* here will be usercard component */}
              <div>Participants list</div>
            </>
          )}
        </>
      )}
    </Content>
  );
};

export default ScheduleDetailsModal;
