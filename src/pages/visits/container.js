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
import { handleVisitsGet, handleVisitEdit } from '../../store/visits/thunk';
import { clearVisits } from '../../store/visits/actions';
import { handleScheduleGet } from '../../store/schedules/thunk';
import {
  clearCurrentSchedule,
  clearSchedules,
} from '../../store/schedules/actions';
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

  const [calendarRange, setDateRange] = useState({});

  const dispatch = useDispatch();

  const selectVisits = useMemo(makeSelectVisits, []);
  const visits = useSelector(selectVisits);
  const schedule = useSelector(selectCurrentSchedule);
  const visitsLoading = useSelector(selectVisitsInitLoading);
  const scheduleLoading = useSelector(selectSchedulesLoading);
  const scheduleError = useSelector(selectSchedulesError);

  const visitsPermissions = useVisitsPermissions(schedule);

  const [generateScheduleCancelToken, cancelScheduleRequest] = useCancelToken();
  const [generateVisitsCancelToken, cancelVisitsRequest] = useCancelToken();

  useEffect(() => {
    cancelScheduleRequest();

    dispatch(handleScheduleGet(id, generateScheduleCancelToken()));

    return () => {
      batch(() => {
        dispatch(clearCurrentSchedule());
        dispatch(clearVisits());
      });
      cancelScheduleRequest();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => dispatch(clearSchedules()), [dispatch]);

  useEffectAfterMount(() => {
    cancelVisitsRequest();

    dispatch(
      handleVisitsGet({
        id,
        params: calendarRange,
        cancelToken: generateVisitsCancelToken(),
      }),
    );

    return () => cancelVisitsRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarRange]);

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
            calendarRange,
          },
        }),
      ),
    [calendarRange, id, dispatch],
  );
  const handleDateRangeChange = useCallback(
    (data) => {
      const start = dateToISOString(data.start);
      const end = dateToISOString(data.end);

      if (calendarRange.start === start && calendarRange.end === end) return;

      setDateRange({
        start: dateToISOString(data.start),
        end: dateToISOString(data.end),
      });
    },
    [calendarRange],
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
            calendarRange,
          },
        }),
      );
    },
    [calendarRange, id, dispatch],
  );
  const eventChange = useCallback(
    (changeInfo) => {
      const data = changeInfo.event.toPlainObject();

      dispatch(
        handleVisitEdit({
          scheduleId: data.extendedProps.scheduleId,
          visitId: data.id,
          params: calendarRange,
          body: {
            startTime: data.start,
            endTime: data.end,
          },
        }),
      );
    },
    [calendarRange, dispatch],
  );
  const eventClick = useCallback(
    (clickInfo) => {
      const data = clickInfo.event.toPlainObject();
      const scheduleId = data.extendedProps?.scheduleId;
      const visitId = data.id;

      dispatch(
        openModal({
          name: MODAL_NAME.VIEW_VISIT,
          payload: { scheduleId, visitId },
        }),
      );
    },
    [dispatch],
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
      <EventContent
        eventInfo={eventInfo}
        permissions={visitsPermissions}
        calendarRange={calendarRange}
      />
    ),
    [visitsPermissions, calendarRange],
  );

  return {
    visits,
    schedule,
    visitsLoading,
    componentState,
    errorMessage,
    visitsPermissions,
    selectAllow,
    eventClick,
    eventContent,
    slotLabelFormat,
    eventChange,
    handleDateSelect,
    handleDateRangeChange,
    handleAddVisitButtonClick,
  };
};

export default useVisitsPageContainer;
