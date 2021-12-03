import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { handleSprintsGet } from '../../store/sprints/thunk';
import {
  selectSprints,
  selectSprintsError,
  selectSprintsInitLoading,
  selectSprintsTotalCount,
} from '../../store/sprints/selectors';
import { clearSprints } from '../../store/sprints/actions';
import { openModal } from '../../modals/modal-reducer';
import {
  SPRINT_SORT_VALUE,
  SPRINT_STATUS,
  SPRINT_TAB,
} from '../../constants/sprints';
import {
  getComponentState,
  getPaginationPagesCount,
} from '../../utils/general';
import useCancelToken from '../../hooks/use-cancel-token';
import { MODAL_NAME } from '../../modals/constants';
import useEffectAfterMount from '../../hooks/use-effect-after-mount';

const DEFAULT_PAGE = 1;
const MIN_ITEMS_PER_PAGE = 9;

const useSprintsPageContainer = () => {
  const dispatch = useDispatch();

  const [{ page, sort, status }, setState] = useState({
    page: DEFAULT_PAGE,
    sort: SPRINT_SORT_VALUE.NEW_FIRST.value,
    status: SPRINT_TAB.IN_PROGRESS.value,
  });

  const [generateCancelToken, cancelRequest] = useCancelToken();

  const params = useMemo(
    () => ({
      page,
      sort,
      status: SPRINT_STATUS[status]?.value,
    }),
    [page, sort, status],
  );

  useEffect(() => {
    cancelRequest();

    dispatch(
      handleSprintsGet({
        params,
        cancelToken: generateCancelToken(),
      }),
    );

    return () => cancelRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => () => dispatch(clearSprints()), [dispatch, status]);

  const sprints = useSelector(selectSprints);
  const totalCount = useSelector(selectSprintsTotalCount);
  const loading = useSelector(selectSprintsInitLoading);
  const error = useSelector(selectSprintsError);

  useEffectAfterMount(() => {
    if (page > DEFAULT_PAGE && sprints.length === 0) {
      setState((prevState) => ({ ...prevState, page: DEFAULT_PAGE }));
    }
  }, [sprints]);

  const handleStatusChange = (event, value) =>
    setState((prevState) => ({
      ...prevState,
      status: value,
      page: DEFAULT_PAGE,
    }));
  const handleStatusMobileChange = (event) =>
    setState((prevState) => ({
      ...prevState,
      status: event.target.value,
      page: DEFAULT_PAGE,
    }));
  const handleSortChange = (event) =>
    setState((prevState) => ({ ...prevState, sort: event.target.value }));
  const handlePageChange = (event, value) =>
    setState((prevState) => ({ ...prevState, page: value }));

  const handleCreateButtonClick = () =>
    dispatch(openModal({ name: MODAL_NAME.CREATE_SPRINT }));

  const pagesCount = getPaginationPagesCount(totalCount, MIN_ITEMS_PER_PAGE);

  const componentState = useMemo(
    () => getComponentState(loading, error, sprints.length === 0),
    [loading, error, sprints],
  );

  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));

  return {
    page,
    sort,
    status,
    params,
    sprints,
    isLgDown,
    pagesCount,
    componentState,
    handlePageChange,
    handleSortChange,
    handleStatusChange,
    handleStatusMobileChange,
    handleCreateButtonClick,
  };
};

export default useSprintsPageContainer;
