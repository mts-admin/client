import React from 'react';
import TextTruncate from 'react-text-truncate';

import DotsMenu from '../../../../components/menus/dots-menu/dots-menu';
import { MODAL_NAME } from '../../../../modals/constants';
import { PERMISSION_ACTIONS } from '../../../../hooks/use-app-permissions';
import { ACTIVITY_STATUS_FILTERS } from '../../../../constants/activities';

const getMenuOptions = ({
  id,
  userId,
  openModal,
  editable,
  deletable,
  stateParams,
  generateCancelToken,
}) =>
  [
    {
      label: 'View more',
      onClick: () =>
        openModal({
          name: MODAL_NAME.VIEW_USER_ACTIVITY,
          payload: { id },
        }),
    },
    editable && {
      label: 'Edit',
      onClick: () =>
        openModal({
          name: MODAL_NAME.EDIT_ACTIVITY,
          payload: { id },
        }),
    },
    deletable && {
      label: 'Delete',
      onClick: () =>
        openModal({
          name: MODAL_NAME.DELETE_ACTIVITY,
          payload: {
            id,
            userId,
            params: stateParams,
            cancelToken: generateCancelToken(),
          },
        }),
    },
  ].filter(Boolean);

export const getColumns = (
  userId,
  actions,
  openModal,
  stateParams,
  generateCancelToken,
) => [
  {
    name: 'content',
    label: 'Content',
    align: 'left',
    width: '60%',
    render: (data) => <TextTruncate line={1} element="p" text={data.content} />,
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    width: '15%',
    render: (data) => {
      const status = ACTIVITY_STATUS_FILTERS[data.status]?.label;

      return status || '-';
    },
  },
  {
    name: 'createdBy',
    label: 'Created by',
    align: 'left',
    width: '20%',
    render: ({ createdBy }) => createdBy?.name || '-',
  },
  {
    name: 'dots',
    label: '',
    align: 'right',
    width: '5%',
    render: (data) => {
      const editable = actions.includes(PERMISSION_ACTIONS.ACTIVITIES.UPDATE);
      const deletable = actions.includes(PERMISSION_ACTIONS.ACTIVITIES.DELETE);

      return (
        <DotsMenu
          options={getMenuOptions({
            id: data._id,
            userId,
            openModal,
            editable,
            deletable,
            stateParams,
            generateCancelToken,
          })}
        />
      );
    },
  },
];

export const getDefaultFormState = (defaultValues = {}) => ({
  search: '',
  userId: '',
  status: ACTIVITY_STATUS_FILTERS.ALL.value,
  ...defaultValues,
});
