import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  changeFilters,
  changeTabel,
  initialState,
  stateReducer,
} from './state';
import { getColumns, getDefaultFormState } from './helpers';
import { handleUserBonusesGet } from '../../../../store/bonuses/thunk';
import {
  makeSelectBonuses,
  selectBonusesInitLoading,
  selectBonusesTotalCount,
} from '../../../../store/bonuses/selectors';
import { clearBonuses } from '../../../../store/bonuses/actions';
import { openModal } from '../../../../modals/modal-reducer';
import useCancelToken from '../../../../hooks/use-cancel-token';
import useEffectAfterMount from '../../../../hooks/use-effect-after-mount';
import { MODAL_NAME } from '../../../../modals/constants';

const DEFAULT_PAGE = 1;

const useBonusesModuleContainer = (actions) => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: getDefaultFormState(),
  });

  const [generateCancelToken, cancelRequest] = useCancelToken();

  const [{ page, search, userId }, stateDispatch] = useReducer(
    stateReducer,
    initialState,
  );

  const params = useMemo(
    () => ({
      page,
      search,
    }),
    [page, search],
  );

  const selectBonuses = useMemo(makeSelectBonuses, []);

  const bonuses = useSelector(selectBonuses);
  const totalCount = useSelector(selectBonusesTotalCount);
  const loading = useSelector(selectBonusesInitLoading);

  useEffectAfterMount(() => {
    cancelRequest();

    dispatch(
      handleUserBonusesGet({
        userId,
        params,
        cancelToken: generateCancelToken(),
      }),
    );

    return () => cancelRequest();
  }, [page, search, userId.id]);

  useEffectAfterMount(() => {
    if (page > DEFAULT_PAGE && bonuses.length === 0) {
      stateDispatch(changeTabel({ page: DEFAULT_PAGE }));
    }
  }, [bonuses]);

  useEffect(() => () => dispatch(clearBonuses()), [dispatch]);

  const openModalAction = useCallback(
    (data) => dispatch(openModal(data)),
    [dispatch],
  );

  const handleTableChange = useCallback(
    (value) => stateDispatch(changeTabel(value)),
    [],
  );
  const handleFiltersChange = (value) => stateDispatch(changeFilters(value));

  const createBonusCallback = (id) => {
    handleFiltersChange({ userId: id });
    form.reset(getDefaultFormState({ userId: id }));
  };
  const handleCreateButtonClick = () => {
    dispatch(
      openModal({
        name: MODAL_NAME.CREATE_BONUS,
        payload: {
          callback: createBonusCallback,
          cancelToken: generateCancelToken(),
        },
      }),
    );
  };

  const handleRowClick = (data) =>
    dispatch(
      openModal({
        name: MODAL_NAME.VIEW_BONUS,
        payload: { id: data._id },
      }),
    );

  const columns = useMemo(
    () =>
      getColumns(userId, actions, openModalAction, params, generateCancelToken),
    [userId, actions, openModalAction, params, generateCancelToken],
  );

  return {
    form,
    page,
    userId,
    loading,
    columns,
    bonuses,
    totalCount,
    handleRowClick,
    handleTableChange,
    handleFiltersChange,
    handleCreateButtonClick,
  };
};

export default useBonusesModuleContainer;
