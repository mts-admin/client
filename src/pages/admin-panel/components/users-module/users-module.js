import React from 'react';
import { arrayOf, string } from 'prop-types';
import { FormProvider } from 'react-hook-form';

import useUsersModuleContainer from './container';
import {
  Content,
  Header,
  ButtonInvite,
  TableWrapper,
} from './styled-components';
import UsersFilters from './components/users-filters/users-filters';
import DataTable from '../../../../components/data-table';
import { PERMISSION_ACTIONS } from '../../../../hooks/use-app-permissions';

const UsersModule = ({ actions }) => {
  const {
    form,
    page,
    order,
    users,
    orderBy,
    loading,
    columns,
    totalCount,
    handleRowClick,
    handleTableChange,
    handleFiltersChange,
    handleInviteButtonClick,
  } = useUsersModuleContainer(actions);

  return (
    <Content>
      <Header>
        <FormProvider {...form}>
          <UsersFilters onSubmit={handleFiltersChange} />
        </FormProvider>
        {actions.includes(PERMISSION_ACTIONS.USERS.INVITE_USER) && (
          <ButtonInvite onClick={handleInviteButtonClick}>
            + Invite user
          </ButtonInvite>
        )}
      </Header>

      <TableWrapper>
        <DataTable
          columns={columns}
          dataSource={users}
          totalCount={totalCount}
          onChange={handleTableChange}
          onRowClick={handleRowClick}
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

UsersModule.propTypes = {
  actions: arrayOf(string).isRequired,
};

export default UsersModule;
