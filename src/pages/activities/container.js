import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as R from 'ramda';

import { handleMyActivitiesGet } from '../../store/activities/thunk';
import {
  selectActivities,
  selectActivitiesError,
  selectActivitiesInitLoading,
  selectActivitiesRestCount,
  selectActivitiesTotalCount,
} from '../../store/activities/selectors';
import { clearActivities } from '../../store/activities/actions';
import useCancelToken from '../../hooks/use-cancel-token';
import { getNextWeekDay } from '../../utils/date';
import {
  getComponentState,
  getPaginationPagesCount,
  getViewedFilterValue,
} from '../../utils/general';
import { ACTIVITY_STATUS } from '../../constants/activities';
import { VIEWED_FILTER_VALUE } from '../../constants/general';

const SATURDAY_NUMBER = 6;

const DEFAULT_PAGE = 1;
const MIN_ITEMS_PER_PAGE = 9;

const DEFAULT_STATE = {
  search: '',
  type: VIEWED_FILTER_VALUE.SHOW_ALL.value,
  page: DEFAULT_PAGE,
  status: ACTIVITY_STATUS.ACTIVE.value,
};

const useActivitiesPageContainer = () => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: R.omit(['page'], DEFAULT_STATE),
  });

  const [generateCancelToken, cancelRequest] = useCancelToken();

  const activities = useSelector(selectActivities);
  const totalCount = useSelector(selectActivitiesTotalCount);
  const restCount = useSelector(selectActivitiesRestCount);
  const loading = useSelector(selectActivitiesInitLoading);
  const error = useSelector(selectActivitiesError);

  const expiryTimerTimestamp = useMemo(
    () => (restCount ? getNextWeekDay(SATURDAY_NUMBER) : 0),
    [restCount],
  );

  const [{ page, search, type, status }, setState] = useState(DEFAULT_STATE);

  const params = useMemo(
    () => ({
      page,
      search,
      status,
      ...getViewedFilterValue(type),
    }),
    [page, search, status, type],
  );

  useEffect(() => {
    cancelRequest();

    dispatch(
      handleMyActivitiesGet({ params, cancelToken: generateCancelToken() }),
    );

    return () => cancelRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => () => dispatch(clearActivities()), [dispatch]);

  const onTimerExpire = useCallback(() => {
    dispatch(
      handleMyActivitiesGet({
        params: { status: DEFAULT_STATE.status },
        cancelToken: generateCancelToken(),
      }),
    );
  }, [dispatch, generateCancelToken]);

  const handleFiltersChange = useCallback(
    (values) => setState((prevState) => ({ ...prevState, ...values })),
    [],
  );
  const handlePageChange = useCallback(
    (event, value) => setState((prevState) => ({ ...prevState, page: value })),
    [],
  );
  const handleStatusChange = (event, value) => {
    setState({
      ...DEFAULT_STATE,
      status: value,
    });
    form.reset(R.omit(['page'], DEFAULT_STATE));
  };

  const pagesCount = getPaginationPagesCount(totalCount, MIN_ITEMS_PER_PAGE);

  const componentState = useMemo(
    () => getComponentState(loading, error, activities.length === 0),
    [loading, error, activities],
  );

  return {
    form,
    page,
    status,
    restCount,
    pagesCount,
    activities,
    componentState,
    onTimerExpire,
    handlePageChange,
    handleStatusChange,
    handleFiltersChange,
    expiryTimerTimestamp,
  };
};

export default useActivitiesPageContainer;
