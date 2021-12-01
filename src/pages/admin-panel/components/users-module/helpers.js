import React from 'react';

import DotsMenu from '../../../../components/menus/dots-menu/dots-menu';
import SimpleTag from '../../../../components/simple-tag';
import { MODAL_NAME } from '../../../../modals/constants';
import {
  USER_ROLE_FILTERS,
  USER_STATUS,
  USER_STATUS_FILTERS,
} from '../../../../constants/users';
import { PERMISSION_ACTIONS } from '../../../../hooks/use-app-permissions';
import { COLORS } from '../../../../styles/theme';

const STATUS_COLORS = {
  INVITED: COLORS.BLUE,
  ACTIVE: COLORS.SUCCESS,
  DEACTIVATED: COLORS.ERROR,
};

const getMenuOptions = ({
  user,
  openModal,
  editable,
  cancellable,
  stateParams,
  generateCancelToken,
}) =>
  [
    {
      label: 'View more',
      onClick: () =>
        openModal({
          name: MODAL_NAME.VIEW_USER,
          payload: { userId: user._id },
        }),
    },
    editable && {
      label: 'Edit',
      onClick: () =>
        openModal({
          name: MODAL_NAME.EDIT_USER,
          payload: { userId: user._id },
        }),
    },
    cancellable && {
      label: 'Cancel invitation',
      onClick: () =>
        openModal({
          name: MODAL_NAME.CANCEL_INVITATION,
          payload: {
            user,
            params: stateParams,
            cancelToken: generateCancelToken(),
          },
        }),
    },
  ].filter(Boolean);

export const getColumns = (
  actions,
  openModal,
  stateParams,
  generateCancelToken,
) => [
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    width: '55%',
    sortable: true,
  },
  {
    name: 'role',
    label: 'Role',
    align: 'left',
    width: '20%',
    render: ({ role }) => USER_ROLE_FILTERS[role]?.label || '-',
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    width: '20%',
    render: (data) => {
      const status = USER_STATUS_FILTERS[data.status]?.label;
      const color = STATUS_COLORS[data.status];

      return status ? (
        <SimpleTag color={color} type="contained">
          {status}
        </SimpleTag>
      ) : (
        '-'
      );
    },
  },
  {
    name: 'dots',
    label: '',
    align: 'right',
    width: '5%',
    render: (user) => {
      const editable =
        actions.includes(PERMISSION_ACTIONS.USERS.EDIT_USER) &&
        user.status !== USER_STATUS.INVITED;
      const cancellable =
        actions.includes(PERMISSION_ACTIONS.USERS.INVITE_USER) &&
        user.status === USER_STATUS.INVITED;

      return (
        <DotsMenu
          options={getMenuOptions({
            user,
            openModal,
            editable,
            cancellable,
            stateParams,
            generateCancelToken,
          })}
        />
      );
    },
  },
];

export const getDefaultFormState = () => ({
  search: '',
  status: USER_STATUS_FILTERS.ALL.value,
  role: USER_ROLE_FILTERS.ALL.value,
});
