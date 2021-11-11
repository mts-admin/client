import * as React from 'react';
import {
  func,
  oneOf,
  string,
  arrayOf,
  shape,
  object,
  oneOfType,
  number,
  bool,
} from 'prop-types';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import * as R from 'ramda';

import {
  StyledTable,
  StyledTableRow,
  StyledTableHead,
  StyledTableBody,
  EmptyMessage,
} from './styled-components';
import { LoaderWithBackground } from '../loaders/fullscreen-loader';

const DataTableHead = ({ columns, order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <StyledTableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.name}
            align={headCell.align}
            style={{ width: headCell.width }}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.name}
                direction={orderBy === headCell.name ? order : 'asc'}
                onClick={createSortHandler(headCell.name)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </StyledTableHead>
  );
};

DataTableHead.propTypes = {
  columns: arrayOf(
    shape({
      name: string.isRequired,
      label: string.isRequired,
      align: oneOf(['left', 'right']).isRequired,
      width: string.isRequired,
      sortable: bool,
    }),
  ).isRequired,
  order: oneOf(['asc', 'desc']),
  orderBy: string,
  onRequestSort: func,
};

const DataTable = ({
  columns,
  dataSource,
  totalCount,
  onChange,
  onRowClick,
  page,
  rowsPerPage,
  order,
  orderBy,
  loading,
}) => {
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    const sortOrder = isAsc ? 'desc' : 'asc';

    onChange({ order: sortOrder, orderBy: property });
  };

  const handleChangePage = (event, newPage) => {
    onChange({ page: newPage + 1 });
  };

  return (
    <>
      <TableContainer>
        <StyledTable>
          <DataTableHead
            columns={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <StyledTableBody>
            {dataSource.map((row) => (
              <StyledTableRow
                key={row._id}
                hover
                tabIndex={-1}
                onClick={() => onRowClick && onRowClick(row)}
                backgroundcolor={row.backgroundColor}
              >
                {columns.map(({ name, align, render }) => (
                  <TableCell key={name} align={align}>
                    {R.is(Function, render) ? render(row) : row[name]}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))}
            {loading && dataSource.length > 0 && <LoaderWithBackground />}
          </StyledTableBody>
        </StyledTable>
      </TableContainer>

      {dataSource.length === 0 && (
        <EmptyMessage>{loading ? 'Loading...' : 'No items found'}</EmptyMessage>
      )}

      <TablePagination
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
      />
    </>
  );
};

DataTable.propTypes = {
  columns: arrayOf(
    shape({
      name: string.isRequired,
      label: string.isRequired,
      align: oneOf(['left', 'right']).isRequired,
      width: string.isRequired,
      sortable: bool,
      render: func,
    }),
  ).isRequired,
  dataSource: arrayOf(object).isRequired,
  totalCount: number.isRequired,
  onChange: func.isRequired,
  page: oneOfType([number, string]).isRequired,
  onRowClick: func,
  rowsPerPage: number,
  order: oneOf(['asc', 'desc']),
  orderBy: string,
  loading: bool,
};

DataTable.defaultProps = {
  rowsPerPage: 10,
};

export default React.memo(DataTable);
