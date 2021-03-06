import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { handleFinancesGet } from '../../../../store/finances/thunk';
import {
  makeSelectFinances,
  selectFinancesInitLoading,
  selectFinancesTotalCount,
} from '../../../../store/finances/selectors';
import useCancelToken from '../../../../hooks/use-cancel-token';
import { clearFinances } from '../../../../store/finances/actions';
import { openModal } from '../../../../modals/modal-reducer';
import {
  initialState,
  stateReducer,
  changeTabel,
  changeFilters,
} from './state';
import { getColumns, getDataSource, getDefaultFormState } from './helpers';
import { MODAL_NAME } from '../../../../modals/constants';
import useEffectAfterMount from '../../../../hooks/use-effect-after-mount';
import { getSortValue } from '../../../../utils/general';

const DEFAULT_PAGE = 1;

const useStatementsTabContainer = () => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: getDefaultFormState(),
  });

  const [generateCancelToken, cancelRequest] = useCancelToken();

  const [{ page, order, orderBy, search, start, end }, stateDispatch] =
    useReducer(stateReducer, initialState);

  const params = useMemo(
    () => ({
      page,
      sort: getSortValue(order, orderBy),
      search,
      start,
      ...(end && { end }),
    }),
    [page, order, orderBy, search, start, end],
  );

  useEffect(() => {
    cancelRequest();

    dispatch(
      handleFinancesGet({
        params,
        cancelToken: generateCancelToken(),
      }),
    );

    return () => cancelRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => () => dispatch(clearFinances()), [dispatch]);

  const selectFinances = useMemo(makeSelectFinances, []);

  const finances = useSelector(selectFinances);
  const totalCount = useSelector(selectFinancesTotalCount);
  const loading = useSelector(selectFinancesInitLoading);

  useEffectAfterMount(() => {
    if (page > DEFAULT_PAGE && finances.length === 0) {
      stateDispatch(changeTabel({ page: DEFAULT_PAGE }));
    }
  }, [finances]);

  const openModalAction = useCallback(
    (data) => dispatch(openModal(data)),
    [dispatch],
  );

  const columns = useMemo(
    () => getColumns(openModalAction, params, generateCancelToken),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openModalAction, params],
  );
  const dataSource = useMemo(() => getDataSource(finances), [finances]);

  const handleTableChange = useCallback(
    (value) => stateDispatch(changeTabel(value)),
    [],
  );
  const handleFiltersChange = (value) => stateDispatch(changeFilters(value));

  const createFinanceCallback = () => {
    handleFiltersChange({});
    form.reset(getDefaultFormState());
  };
  const onCreateButtonClick = () =>
    dispatch(
      openModal({
        name: MODAL_NAME.CREATE_FINANCE,
        payload: {
          callback: createFinanceCallback,
          cancelToken: generateCancelToken(),
        },
      }),
    );

  const handleRowClick = (data) =>
    dispatch(
      openModal({
        name: MODAL_NAME.VIEW_FINANCE,
        payload: { financeId: data._id },
      }),
    );

  return {
    form,
    page,
    order,
    orderBy,
    loading,
    columns,
    dataSource,
    totalCount,
    handleRowClick,
    handleTableChange,
    handleFiltersChange,
    onCreateButtonClick,
  };
};

export default useStatementsTabContainer;
