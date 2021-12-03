import React from 'react';
import { arrayOf, string } from 'prop-types';
import { FormProvider } from 'react-hook-form';

import {
  Content,
  Header,
  ButtonAdd,
  Description,
  TableWrapper,
} from './styled-components';
import useBonusesModuleContainer from './container';
import BonusesFilters from './components/bonuses-filters/bonuses-filters';
import DataTable from '../../../../components/data-table';
import { PERMISSION_ACTIONS } from '../../../../hooks/use-app-permissions';

const BonusesModule = ({ actions }) => {
  const {
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
  } = useBonusesModuleContainer(actions);

  return (
    <Content>
      <Header>
        <FormProvider {...form}>
          <BonusesFilters onSubmit={handleFiltersChange} />
        </FormProvider>
        {actions.includes(PERMISSION_ACTIONS.BONUSES.CREATE) && (
          <ButtonAdd onClick={handleCreateButtonClick}>+ Add</ButtonAdd>
        )}
      </Header>

      {userId ? (
        <TableWrapper>
          <DataTable
            columns={columns}
            dataSource={bonuses}
            totalCount={totalCount}
            onChange={handleTableChange}
            onRowClick={handleRowClick}
            page={page}
            rowsPerPage={9}
            loading={loading}
          />
        </TableWrapper>
      ) : (
        <Description>Select a user above to see his/her bonuses</Description>
      )}
    </Content>
  );
};

BonusesModule.propTypes = {
  actions: arrayOf(string).isRequired,
};

export default BonusesModule;
