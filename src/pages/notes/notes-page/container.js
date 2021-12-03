import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as R from 'ramda';

import { handleNotesGet } from '../../../store/notes/thunk';
import {
  selectNotes,
  selectNotesError,
  selectNotesInitLoading,
  selectNotesTotalCount,
} from '../../../store/notes/selectors';
import { clearNotes } from '../../../store/notes/actions';
import useCancelToken from '../../../hooks/use-cancel-token';
import { NOTES_SORT_VALUE, NOTES_TYPE_VALUE } from '../../../constants/notes';
import { getFavoriteFilter } from './helpers';
import {
  getComponentState,
  getPaginationPagesCount,
} from '../../../utils/general';
import { ROUTE } from '../../../routes/constants';
import useEffectAfterMount from '../../../hooks/use-effect-after-mount';

const DEFAULT_PAGE = 1;
const MIN_ITEMS_PER_PAGE = 9;

const DEFAULT_STATE = {
  search: '',
  sort: NOTES_SORT_VALUE.NEW_FIRST.value,
  type: NOTES_TYPE_VALUE.SHOW_ALL.value,
  page: DEFAULT_PAGE,
};

const useNotesPageContainer = () => {
  const dispatch = useDispatch();

  const { push } = useHistory();

  const [generateCancelToken, cancelRequest] = useCancelToken();

  const [{ search, sort, type, page }, setState] = useState(DEFAULT_STATE);

  const filtersDefaultState = useMemo(
    () => R.omit(['page'], DEFAULT_STATE),
    [],
  );

  const params = useMemo(
    () => ({
      page,
      sort,
      search,
      ...getFavoriteFilter(type),
    }),
    [page, search, sort, type],
  );

  useEffect(() => {
    cancelRequest();

    dispatch(
      handleNotesGet({
        params,
        cancelToken: generateCancelToken(),
      }),
    );

    return () => cancelRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => () => dispatch(clearNotes()), [dispatch]);

  const notes = useSelector(selectNotes);
  const totalCount = useSelector(selectNotesTotalCount);
  const loading = useSelector(selectNotesInitLoading);
  const error = useSelector(selectNotesError);

  useEffectAfterMount(() => {
    if (page > DEFAULT_PAGE && notes.length === 0) {
      setState((prevState) => ({ ...prevState, page: DEFAULT_PAGE }));
    }
  }, [notes]);

  const handleFiltersChange = useCallback(
    (values) => setState((prevState) => ({ ...prevState, ...values })),
    [],
  );
  const handlePageChange = useCallback(
    (event, value) => setState((prevState) => ({ ...prevState, page: value })),
    [],
  );
  const onCreateButtonClick = () => push(ROUTE.CREATE_NOTE);

  const componentState = useMemo(
    () => getComponentState(loading, error, notes.length === 0),
    [loading, error, notes],
  );

  const pagesCount = getPaginationPagesCount(totalCount, MIN_ITEMS_PER_PAGE);

  return {
    page,
    notes,
    params,
    pagesCount,
    componentState,
    filtersDefaultState,
    handlePageChange,
    handleFiltersChange,
    onCreateButtonClick,
  };
};

export default useNotesPageContainer;
