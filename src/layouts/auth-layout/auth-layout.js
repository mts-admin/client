import React from 'react';
import { Switch } from 'react-router-dom';

import AuthRoute from '../../routes/auth-route';
import MainNav from '../../components/main-nav';
import ModalWindow from '../../modals/modal-window';
import { Layout, Container } from './styled-components';
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
    <Container>
      <MainNav />
      <Routes />
      <ModalWindow />
    </Container>
  </Layout>
);

export default AuthLayout;
