import React from 'react';
import { FormProvider } from 'react-hook-form';

import {
  Content,
  TableWrapper,
  Controls,
  AddButton,
} from './styled-components';
import useFinancesContainer from './container';
import DataTable from '../../components/data-table/data-table';
import { FinanceFilters } from './components/finance-filters/finance-filters';

const FinancesPage = () => {
  const {
    form,
    page,
    order,
    orderBy,
    loading,
    columns,
    dataSource,
    totalCount,
    handleTableChange,
    handleFiltersChange,
    onCreateButtonClick,
  } = useFinancesContainer();

  return (
    <Content>
      <Controls>
        <FormProvider {...form}>
          <FinanceFilters onSubmit={handleFiltersChange} />
        </FormProvider>

        <AddButton onClick={onCreateButtonClick}>+ Add</AddButton>
      </Controls>

      <TableWrapper>
        <DataTable
          columns={columns}
          dataSource={dataSource}
          totalCount={totalCount}
          onChange={handleTableChange}
          // onRowClick={(data) => console.log(data)}
          page={page}
          order={order}
          orderBy={orderBy}
          rowsPerPage={9}
          loading={loading}
        />
      </TableWrapper>
    </Content>
  );
};

export default FinancesPage;
