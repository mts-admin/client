import React from 'react';
import { Switch } from 'react-router-dom';

import AuthRoute from '../../routes/auth-route';
import MainNav from '../../components/main-nav';
import { Layout, Content } from './styled-components';
import routesConfig from '../../routes/routes-config';

const Routes = () => (
  <Switch>
    {routesConfig
      .filter(({ auth }) => auth)
      .map(({ path, allowedRoles, component: Component }) => (
        <AuthRoute key={path} path={path} allowedRoles={allowedRoles} exact>
          <Component />
        </AuthRoute>
      ))}
  </Switch>
);

const AuthLayout = () => (
  <Layout>
    <Content>
      <MainNav />
      <Routes />
    </Content>
  </Layout>
);

export default React.memo(AuthLayout);
