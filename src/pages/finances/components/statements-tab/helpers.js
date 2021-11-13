import React from 'react';
import { DateTime } from 'luxon';
import * as R from 'ramda';

import DotsMenu from '../../../../components/menus/dots-menu/dots-menu';
import { FINANCE_TYPE } from '../../../../constants/finances';
import { COLORS } from '../../../../styles/theme';
import { formatISO } from '../../../../utils/date';
import { hexToRgba } from '../../../../utils/general';
import { MODAL_NAME } from '../../../../modals/constants';

const getMenuOptions = (openModal, financeId, stateParams) => [
  {
    label: 'View more',
    onClick: () =>
      openModal({
        name: MODAL_NAME.VIEW_FINANCE,
        payload: { financeId },
      }),
  },
  {
    label: 'Edit',
    onClick: () =>
      openModal({
        name: MODAL_NAME.EDIT_FINANCE,
        payload: { financeId },
      }),
  },
  {
    label: 'Delete',
    onClick: () =>
      openModal({
        name: MODAL_NAME.DELETE_FINANCE,
        payload: { financeId, params: stateParams },
      }),
  },
];

export const getColumns = (openModal, stateParams) => [
  {
    name: 'title',
    label: 'Title',
    align: 'left',
    width: '55%',
  },
  {
    name: 'total',
    label: 'Total',
    align: 'right',
    width: '10%',
    sortable: true,
    render: (data) =>
      R.cond([
        [R.equals(FINANCE_TYPE.INCOME), () => `+${data.total}`],
        [R.equals(FINANCE_TYPE.OUTCOME), () => `-${data.total}`],
        [R.T, () => data.total],
      ])(data.type),
  },
  {
    name: 'date',
    label: 'Date',
    align: 'right',
    width: '25%',
    sortable: true,
    render: (data) => formatISO(data.date, 'D HH:mm'),
  },
  {
    name: 'dots',
    label: '',
    align: 'right',
    width: '10%',
    render: (row) => (
      <DotsMenu options={getMenuOptions(openModal, row._id, stateParams)} />
    ),
  },
];

export const getDataSource = (data) =>
  data &&
  data.map(({ _id, title, total, date, type }) => ({
    _id,
    title,
    total,
    date,
    type,
    backgroundColor: R.cond([
      [R.equals(FINANCE_TYPE.INCOME), () => hexToRgba(COLORS.SUCCESS, 0.25)],
      [R.equals(FINANCE_TYPE.OUTCOME), () => hexToRgba(COLORS.ERROR, 0.25)],
    ])(type),
  }));

export const getSortValue = (order, orderBy) => {
  const sortDirection = {
    asc: '',
    desc: '-',
  };
  return `${sortDirection[order]}${orderBy}`;
};

export const getDefaultFormState = () => ({
  dateRange: [DateTime.now().startOf('month'), DateTime.now().endOf('month')],
  search: '',
});
