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
import useActivitiesModuleContainer from './container';
import ActivitiesFilters from './components/activities-filters/activities-filters';
import DataTable from '../../../../components/data-table';
import { PERMISSION_ACTIONS } from '../../../../hooks/use-app-permissions';

const ActivitiesModule = ({ actions }) => {
  const {
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
  } = useActivitiesModuleContainer(actions);

  return (
    <Content>
      <Header>
        <FormProvider {...form}>
          <ActivitiesFilters onSubmit={handleFiltersChange} />
        </FormProvider>
        {actions.includes(PERMISSION_ACTIONS.ACTIVITIES.CREATE) && (
          <ButtonAdd onClick={handleCreateButtonClick}>+ Add</ButtonAdd>
        )}
      </Header>

      {userId ? (
        <TableWrapper>
          <DataTable
            columns={columns}
            dataSource={activities}
            totalCount={totalCount}
            onChange={handleTableChange}
            onRowClick={handleRowClick}
            page={page}
            rowsPerPage={9}
            loading={loading}
          />
        </TableWrapper>
      ) : (
        <Description>Select a user above to see his/her activities</Description>
      )}
    </Content>
  );
};

ActivitiesModule.propTypes = {
  actions: arrayOf(string).isRequired,
};

export default ActivitiesModule;
