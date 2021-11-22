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
import { getViewedSortFilter } from './helpers';
import { BONUSES_TYPE_VALUE } from '../../constants/bonuses';
import useCancelToken from '../../hooks/use-cancel-token';
import {
  getComponentState,
  getPaginationPagesCount,
} from '../../utils/general';

const MIN_ITEMS_PER_PAGE = 9;

const DEFAULT_STATE = {
  search: '',
  type: BONUSES_TYPE_VALUE.SHOW_ALL.value,
  page: 1,
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
      ...getViewedSortFilter(type),
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
