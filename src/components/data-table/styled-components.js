import styled, { css } from 'styled-components';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';

export const StyledTable = styled(Table)`
  overflow: auto;
`;

export const StyledTableRow = styled(TableRow)`
  ${({ backgroundcolor }) =>
    backgroundcolor &&
    css`
      background-color: ${backgroundcolor};
      cursor: pointer;

      &.MuiTableRow-hover:hover {
        background-color: ${backgroundcolor};
      }
    `}
`;

export const StyledTableHead = styled(TableHead)`
  background-color: ${({ theme }) => theme.colors.lightGreySecondary};
`;

export const StyledTableBody = styled(TableBody)`
  position: relative;
`;

export const EmptyMessage = styled.p`
  margin: 16px 0;
  font-size: ${({ theme }) => theme.fontSize.normal};
  color: ${({ theme }) => theme.colors.grey};
  text-align: center;
  font-style: italic;
`;
