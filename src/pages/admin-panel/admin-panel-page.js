import React, { useMemo, useState } from 'react';
import * as R from 'ramda';

import { Content, Tabs } from './styled-components';
import UsersModule from './components/users-module';
import BonusesModule from './components/bonuses-module';
import ActivitiesModule from './components/activities-module';
import useAppPermissions, {
  PERMISSION_MODULES,
} from '../../hooks/use-app-permissions';

const getModuleActions = (permissions, moduleValue) =>
  permissions?.find(({ module }) => module.value === moduleValue)?.actions;

const AdminPanelPage = () => {
  const permissions = useAppPermissions();

  const tabsOptions = useMemo(
    () => permissions.map(({ module }) => module),
    [permissions],
  );

  const [activeTab, setActiveTab] = useState(tabsOptions[0].value);

  const handleTabChange = (_, value) => setActiveTab(value);

  return (
    <Content>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        options={tabsOptions}
      />

      {R.cond([
        [
          R.equals(PERMISSION_MODULES.USERS.value),
          () => (
            <UsersModule
              actions={getModuleActions(
                permissions,
                PERMISSION_MODULES.USERS.value,
              )}
            />
          ),
        ],
        [
          R.equals(PERMISSION_MODULES.BONUSES.value),
          () => (
            <BonusesModule
              actions={getModuleActions(
                permissions,
                PERMISSION_MODULES.BONUSES.value,
              )}
            />
          ),
        ],
        [
          R.equals(PERMISSION_MODULES.ACTIVITIES.value),
          () => (
            <ActivitiesModule
              actions={getModuleActions(
                permissions,
                PERMISSION_MODULES.ACTIVITIES.value,
              )}
            />
          ),
        ],
      ])(activeTab)}
    </Content>
  );
};

export default AdminPanelPage;
