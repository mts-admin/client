import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as R from 'ramda';

import { handleScheduleGet } from '../../store/schedules/thunk';
import { clearCurrentSchedule } from '../../store/schedules/actions';
import { selectModalPayload } from '../modal-reducer';
import {
  selectSchedulesLoading,
  selectSchedulesError,
  selectCurrentSchedule,
} from '../../store/schedules/selectors';
import { Title, Content, ErrorMessage } from './styled-components';
import { getErrorMessage, getComponentState } from '../../utils/general';
import { COMPONENT_STATE } from '../../constants/general';

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
          <h3>Name</h3>
          <p>{schedule.name}</p>

          <h3>Description</h3>
          <p>{schedule.description || '-'}</p>

          <h3>Creation date</h3>
          <p>{schedule.createdAt}</p>

          <h3>Owner</h3>
          {/* here will be usercard component */}
          <div>{schedule?.owner?.name}</div>

          {hasParticipants && (
            <>
              <h3>Participants</h3>
              {/* here will be usercard component */}
              <div>Participants list</div>
            </>
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
