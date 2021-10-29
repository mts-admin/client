import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useParams } from 'react-router';

import {
  makeSelectVisits,
  selectVisitsInitLoading,
} from '../../store/visits/selectors';
import {
  selectSchedulesLoading,
  selectSchedulesError,
  selectCurrentSchedule,
} from '../../store/schedules/selectors';
import { handleVisitsGet } from '../../store/visits/thunk';
import { clearVisits } from '../../store/visits/actions';
import { handleScheduleGet } from '../../store/schedules/thunk';
import { clearCurrentSchedule } from '../../store/schedules/actions';
import useVisitsPermissions from '../../hooks/use-visits-permissions';
import { openModal } from '../../modals/modal-reducer';
import { EventContent } from './components/event-content';
import {
  areDatesInTheSameDay,
  dateToISOString,
  getInclusiveDate,
} from '../../utils/date';
import useCancelToken from '../../hooks/use-cancel-token';
import useEffectAfterMount from '../../hooks/use-effect-after-mount';
import { MODAL_NAME } from '../../modals/constants';
import { getComponentState, getErrorMessage } from '../../utils/general';

const useVisitsPageContainer = () => {
  const { id } = useParams();

  const [{ start, end }, setDateRange] = useState({});

  const dispatch = useDispatch();

  const selectVisits = useMemo(makeSelectVisits, []);
  const visits = useSelector(selectVisits);
  const schedule = useSelector(selectCurrentSchedule);
  const visitsLoading = useSelector(selectVisitsInitLoading);
  const scheduleLoading = useSelector(selectSchedulesLoading);
  const scheduleError = useSelector(selectSchedulesError);

  const visitsPermissions = useVisitsPermissions(schedule);

  const [generateCancelToken, cancelRequest] = useCancelToken();

  useEffect(() => {
    dispatch(handleScheduleGet(id));

    return () => {
      batch(() => {
        dispatch(clearCurrentSchedule());
        dispatch(clearVisits());
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectAfterMount(() => {
    cancelRequest();

    dispatch(
      handleVisitsGet({
        id,
        params: { start, end },
        cancelToken: generateCancelToken(),
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end]);

  const errorMessage = scheduleError && getErrorMessage(scheduleError);

  const componentState = useMemo(
    () => getComponentState(scheduleLoading, errorMessage),
    [scheduleLoading, errorMessage],
  );

  const handleAddVisitButtonClick = useCallback(
    () =>
      dispatch(
        openModal({
          name: MODAL_NAME.CREATE_VISIT,
          payload: {
            scheduleId: id,
            calendarRange: { start, end },
          },
        }),
      ),
    [start, end, id, dispatch],
  );
  const handleDateRangeChange = useCallback(
    (data) =>
      setDateRange({
        start: dateToISOString(data.start),
        end: dateToISOString(data.end),
      }),
    [],
  );
  const handleDateSelect = useCallback(
    (selectInfo) => {
      const calendarApi = selectInfo.view.calendar;
      const dates = {
        start: dateToISOString(selectInfo.start),
        end: getInclusiveDate(selectInfo.end, selectInfo.allDay),
      };

      const successCallback = () => calendarApi.unselect();

      dispatch(
        openModal({
          name: MODAL_NAME.CREATE_VISIT,
          payload: {
            scheduleId: id,
            successCallback,
            defaultDates: dates,
            calendarRange: { start, end },
          },
        }),
      );
    },
    [start, end, id, dispatch],
  );

  // prevent time selecting for more than 1 day (timeGridWeek view)
  const selectAllow = useCallback(
    (data) =>
      !data.startStr.includes('T') ||
      areDatesInTheSameDay(data.startStr, data.endStr),
    [],
  );
  // format the time column to 24 hour format
  const slotLabelFormat = useCallback(
    (e) =>
      `${String(e.date.hour).padStart(2, '0')}:${String(e.date.minute).padStart(
        2,
        '0',
      )}`,
    [],
  );
  const eventContent = useCallback(
    (eventInfo) => (
      <EventContent eventInfo={eventInfo} permissions={visitsPermissions} />
    ),
    [visitsPermissions],
  );

  return {
    visits,
    schedule,
    visitsLoading,
    componentState,
    errorMessage,
    visitsPermissions,
    selectAllow,
    eventContent,
    slotLabelFormat,
    handleDateSelect,
    handleDateRangeChange,
    handleAddVisitButtonClick,
  };
};

export default useVisitsPageContainer;
