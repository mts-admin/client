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
import { handleUserActivitiesGet } from '../../../../store/activities/thunk';
import {
  makeSelectActivities,
  selectActivitiesInitLoading,
  selectActivitiesTotalCount,
} from '../../../../store/activities/selectors';
import { clearActivities } from '../../../../store/activities/actions';
import { openModal } from '../../../../modals/modal-reducer';
import useCancelToken from '../../../../hooks/use-cancel-token';
import useEffectAfterMount from '../../../../hooks/use-effect-after-mount';
import { MODAL_NAME } from '../../../../modals/constants';
import { ACTIVITY_STATUS } from '../../../../constants/activities';

const DEFAULT_PAGE = 1;

const useActivitiesModuleContainer = (actions) => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: getDefaultFormState(),
  });

  const [generateCancelToken, cancelRequest] = useCancelToken();

  const [{ page, search, status, userId }, stateDispatch] = useReducer(
    stateReducer,
    initialState,
  );

  const params = useMemo(
    () => ({
      page,
      search,
      status: ACTIVITY_STATUS[status]?.value,
    }),
    [page, search, status],
  );

  const selectActivities = useMemo(makeSelectActivities, []);

  const activities = useSelector(selectActivities);
  const totalCount = useSelector(selectActivitiesTotalCount);
  const loading = useSelector(selectActivitiesInitLoading);

  useEffectAfterMount(() => {
    cancelRequest();

    dispatch(
      handleUserActivitiesGet({
        params,
        userId,
        cancelToken: generateCancelToken(),
      }),
    );

    return () => cancelRequest();
  }, [page, search, status, userId.id]);

  useEffectAfterMount(() => {
    if (page > DEFAULT_PAGE && activities.length === 0) {
      stateDispatch(changeTabel({ page: DEFAULT_PAGE }));
    }
  }, [activities]);

  useEffect(() => () => dispatch(clearActivities()), [dispatch]);

  const openModalAction = useCallback(
    (data) => dispatch(openModal(data)),
    [dispatch],
  );

  const handleTableChange = useCallback(
    (value) => stateDispatch(changeTabel(value)),
    [],
  );
  const handleFiltersChange = (value) => stateDispatch(changeFilters(value));

  const createActivityCallback = (id) => {
    handleFiltersChange({ userId: id });
    form.reset(getDefaultFormState({ userId: id }));
  };
  const handleCreateButtonClick = () => {
    dispatch(
      openModal({
        name: MODAL_NAME.CREATE_ACTIVITY,
        payload: {
          callback: createActivityCallback,
          cancelToken: generateCancelToken(),
        },
      }),
    );
  };

  const handleRowClick = (data) =>
    dispatch(
      openModal({
        name: MODAL_NAME.VIEW_USER_ACTIVITY,
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
    activities,
    totalCount,
    handleRowClick,
    handleTableChange,
    handleFiltersChange,
    handleCreateButtonClick,
  };
};

export default useActivitiesModuleContainer;
