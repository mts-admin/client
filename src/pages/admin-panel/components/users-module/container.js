import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  changeFilters,
  changeTabel,
  initialState,
  stateReducer,
} from './state';
import { handleUsersGet } from '../../../../store/users/thunk';
import {
  makeSelectUsers,
  selectUsersInitLoading,
  selectUsersTotalCount,
} from '../../../../store/users/selectors';
import { clearUsers } from '../../../../store/users/actions';
import { openModal } from '../../../../modals/modal-reducer';
import useCancelToken from '../../../../hooks/use-cancel-token';
import useEffectAfterMount from '../../../../hooks/use-effect-after-mount';
import { getSortValue } from '../../../../utils/general';
import { MODAL_NAME } from '../../../../modals/constants';
import { getColumns, getDefaultFormState } from './helpers';
import { USER_ROLE, USER_STATUS } from '../../../../constants/users';

const DEFAULT_PAGE = 1;

const useUsersModuleContainer = (actions) => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: getDefaultFormState(),
  });

  const [generateCancelToken, cancelRequest] = useCancelToken();

  const [{ page, order, orderBy, search, status, role }, stateDispatch] =
    useReducer(stateReducer, initialState);

  const params = useMemo(
    () => ({
      page,
      search,
      role: USER_ROLE[role],
      status: USER_STATUS[status],
      sort: getSortValue(order, orderBy),
    }),
    [page, search, status, role, order, orderBy],
  );

  const selectUsers = useMemo(makeSelectUsers, []);

  const users = useSelector(selectUsers);
  const totalCount = useSelector(selectUsersTotalCount);
  const loading = useSelector(selectUsersInitLoading);

  useEffect(() => {
    cancelRequest();

    dispatch(
      handleUsersGet({
        params,
        cancelToken: generateCancelToken(),
      }),
    );

    return () => cancelRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => () => dispatch(clearUsers()), [dispatch]);

  useEffectAfterMount(() => {
    if (page > DEFAULT_PAGE && users.length === 0) {
      stateDispatch(changeTabel({ page: DEFAULT_PAGE }));
    }
  }, [users]);

  const openModalAction = useCallback(
    (data) => dispatch(openModal(data)),
    [dispatch],
  );

  const handleTableChange = useCallback(
    (value) => stateDispatch(changeTabel(value)),
    [],
  );
  const handleFiltersChange = (value) => stateDispatch(changeFilters(value));

  const inviteUserCallback = () => {
    handleFiltersChange({});
    form.reset(getDefaultFormState());
  };
  const handleInviteButtonClick = () => {
    dispatch(
      openModal({
        name: MODAL_NAME.INVITE_USER,
        payload: {
          callback: inviteUserCallback,
          cancelToken: generateCancelToken(),
        },
      }),
    );
  };

  const handleRowClick = (data) =>
    dispatch(
      openModal({
        name: MODAL_NAME.VIEW_USER,
        payload: { userId: data._id },
      }),
    );

  const columns = useMemo(
    () => getColumns(actions, openModalAction, params, generateCancelToken),
    [actions, openModalAction, params, generateCancelToken],
  );

  return {
    form,
    page,
    users,
    order,
    orderBy,
    loading,
    columns,
    totalCount,
    handleRowClick,
    handleTableChange,
    handleFiltersChange,
    handleInviteButtonClick,
  };
};

export default useUsersModuleContainer;
