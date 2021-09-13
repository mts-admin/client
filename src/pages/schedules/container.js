import { useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { handleSchedulesGet } from '../../store/schedules/thunk';
import {
  selectSchedules,
  selectSchedulesLoading,
  selectSchedulesTotalCount,
} from '../../store/schedules/selectors';
import { openModal } from '../../modals/modal-reducer';
import useCancelToken from '../../hooks/use-cancel-token';
import { getPaginationPagesCount } from '../../utils/general';
import { SCHEDULE_TYPE } from '../../constants/schedules';
import { MODAL_NAME } from '../../modals/constants';

const DEFAULT_PAGE = 1;
const MIN_ITEMS_PER_PAGE = 9;

const ACTION_TYPE = {
  CHANGE_TYPE: 'CHANGE_TYPE',
  CHANGE_PAGE: 'CHANGE_PAGE',
};

const initialState = {
  page: DEFAULT_PAGE,
  scheduleType: SCHEDULE_TYPE.MY,
};

const changeType = (payload) => ({
  type: ACTION_TYPE.CHANGE_TYPE,
  payload,
});
const changePage = (payload) => ({
  type: ACTION_TYPE.CHANGE_PAGE,
  payload,
});

const stateReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.CHANGE_TYPE:
      return {
        page: DEFAULT_PAGE,
        scheduleType: action.payload,
      };
    case ACTION_TYPE.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

const useSchedulesPageContainer = () => {
  const [{ page, scheduleType }, stateDispatch] = useReducer(
    stateReducer,
    initialState,
  );

  const dispatch = useDispatch();

  const schedules = useSelector(selectSchedules);
  const loading = useSelector(selectSchedulesLoading);
  const totalCount = useSelector(selectSchedulesTotalCount);

  const [generateCancelToken, cancelRequest] = useCancelToken();

  useEffect(() => {
    cancelRequest();

    dispatch(
      handleSchedulesGet({
        page,
        type: scheduleType,
        cancelToken: generateCancelToken(),
      }),
    );

    return () => cancelRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, scheduleType]);

  const onTypeChange = (_, value) => stateDispatch(changeType(value));
  const onPageChange = (_, value) => stateDispatch(changePage(value));

  const createScheduleCallback = () => onPageChange(null, DEFAULT_PAGE);

  const onCreateButtonClick = () =>
    dispatch(
      openModal({
        name: MODAL_NAME.CREATE_SCHEDULE,
        payload: {
          callback: createScheduleCallback,
          cancelToken: generateCancelToken(),
        },
      }),
    );

  const pagesCount = getPaginationPagesCount(totalCount, MIN_ITEMS_PER_PAGE);

  return {
    loading,
    schedules,
    pagesCount,
    page,
    scheduleType,
    onTypeChange,
    onPageChange,
    onCreateButtonClick,
  };
};

export default useSchedulesPageContainer;
