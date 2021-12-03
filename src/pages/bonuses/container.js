import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';

import { handleMyBonusesGet } from '../../store/bonuses/thunk';
import {
  selectBonuses,
  selectBonusesError,
  selectBonusesInitLoading,
  selectBonusesTotalCount,
} from '../../store/bonuses/selectors';
import { clearBonuses } from '../../store/bonuses/actions';
import useCancelToken from '../../hooks/use-cancel-token';
import {
  getComponentState,
  getPaginationPagesCount,
  getViewedFilterValue,
} from '../../utils/general';
import { VIEWED_FILTER_VALUE } from '../../constants/general';

const DEFAULT_PAGE = 1;
const MIN_ITEMS_PER_PAGE = 9;

const DEFAULT_STATE = {
  search: '',
  type: VIEWED_FILTER_VALUE.SHOW_ALL.value,
  page: DEFAULT_PAGE,
};

const useBonusesPageContainer = () => {
  const dispatch = useDispatch();

  const bonuses = useSelector(selectBonuses);
  const totalCount = useSelector(selectBonusesTotalCount);
  const loading = useSelector(selectBonusesInitLoading);
  const error = useSelector(selectBonusesError);

  const [{ search, type, page }, setState] = useState(DEFAULT_STATE);

  const filtersDefaultState = useMemo(
    () => R.omit(['page'], DEFAULT_STATE),
    [],
  );

  const params = useMemo(
    () => ({
      page,
      search,
      ...getViewedFilterValue(type),
    }),
    [page, search, type],
  );

  const [generateCancelToken, cancelRequest] = useCancelToken();

  useEffect(() => {
    cancelRequest();

    dispatch(
      handleMyBonusesGet({ params, cancelToken: generateCancelToken() }),
    );

    return () => cancelRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => () => dispatch(clearBonuses()), [dispatch]);

  const handleFiltersChange = useCallback(
    (values) => setState((prevState) => ({ ...prevState, ...values })),
    [],
  );
  const handlePageChange = useCallback(
    (event, value) => setState((prevState) => ({ ...prevState, page: value })),
    [],
  );

  const pagesCount = getPaginationPagesCount(totalCount, MIN_ITEMS_PER_PAGE);

  const componentState = useMemo(
    () => getComponentState(loading, error, bonuses.length === 0),
    [loading, error, bonuses],
  );

  return {
    page,
    bonuses,
    pagesCount,
    componentState,
    filtersDefaultState,
    handleFiltersChange,
    handlePageChange,
  };
};

export default useBonusesPageContainer;
