/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { handleSchedulesGet } from '../../store/schedules/thunk';
import {
  selectSchedules,
  selectSchedulesError,
  selectSchedulesInitLoading,
  selectSchedulesTotalCount,
} from '../../store/schedules/selectors';
import { clearSchedules } from '../../store/schedules/actions';
import { openModal } from '../../modals/modal-reducer';
import useCancelToken from '../../hooks/use-cancel-token';
import {
  getComponentState,
  getPaginationPagesCount,
} from '../../utils/general';
import { SCHEDULE_TYPE } from '../../constants/schedules';
import { MODAL_NAME } from '../../modals/constants';
import useEffectAfterMount from '../../hooks/use-effect-after-mount';

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

const emptyMessageText = {
  [SCHEDULE_TYPE.MY]: {
    title: "You haven't created any schedule yet",
    description:
      "Click the 'Create' button above to create your first schedule",
  },
  [SCHEDULE_TYPE.SHARED]: {
    title: 'You are not a participant of any schedule',
    description: 'Wait until someone invites you',
  },
};

const useSchedulesPageContainer = () => {
  const [{ page, scheduleType }, stateDispatch] = useReducer(
    stateReducer,
    initialState,
  );

  const dispatch = useDispatch();

  const schedules = useSelector(selectSchedules);
  const loading = useSelector(selectSchedulesInitLoading);
  const error = useSelector(selectSchedulesError);
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
  }, [page, scheduleType]);

  useEffect(() => () => dispatch(clearSchedules()), []);

  useEffectAfterMount(() => {
    if (page > DEFAULT_PAGE && schedules.length === 0) {
      stateDispatch(changePage(DEFAULT_PAGE));
    }
  }, [schedules]);

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
  const isSchedulesEmpty = schedules.length === 0;
  const componentState = useMemo(
    () => getComponentState(loading, error, isSchedulesEmpty),
    [loading, error, isSchedulesEmpty],
  );
  const emptyMessage = emptyMessageText[scheduleType];

  return {
    page,
    pagesCount,
    schedules,
    scheduleType,
    componentState,
    emptyMessage,
    onTypeChange,
    onPageChange,
    onCreateButtonClick,
  };
};

export default useSchedulesPageContainer;
