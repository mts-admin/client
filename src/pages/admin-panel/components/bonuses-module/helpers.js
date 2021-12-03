import React from 'react';
import TextTruncate from 'react-text-truncate';

import DotsMenu from '../../../../components/menus/dots-menu/dots-menu';
import { MODAL_NAME } from '../../../../modals/constants';
import { PERMISSION_ACTIONS } from '../../../../hooks/use-app-permissions';
import { formatISO } from '../../../../utils/date';

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
          name: MODAL_NAME.VIEW_BONUS,
          payload: { id },
        }),
    },
    editable && {
      label: 'Edit',
      onClick: () =>
        openModal({
          name: MODAL_NAME.EDIT_BONUS,
          payload: { id },
        }),
    },
    deletable && {
      label: 'Delete',
      onClick: () =>
        openModal({
          name: MODAL_NAME.DELETE_BONUS,
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
    name: 'title',
    label: 'Title',
    align: 'left',
    width: '60%',
    render: (data) => <TextTruncate line={1} element="p" text={data.title} />,
  },
  {
    name: 'createdBy',
    label: 'Created by',
    align: 'left',
    width: '20%',
    render: ({ createdBy }) => createdBy?.name || '-',
  },
  {
    name: 'createdAt',
    label: 'Created at',
    align: 'left',
    width: '15%',
    render: ({ createdAt }) => (createdAt ? formatISO(createdAt, 'D') : '-'),
  },
  {
    name: 'dots',
    label: '',
    align: 'right',
    width: '5%',
    render: (data) => {
      const editable = actions.includes(PERMISSION_ACTIONS.BONUSES.UPDATE);
      const deletable = actions.includes(PERMISSION_ACTIONS.BONUSES.DELETE);

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
  ...defaultValues,
});
