import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout, Content } from './styled-components';
import routesConfig from '../../routes/routes-config';

const Routes = () => (
  <Switch>
    {routesConfig
      .filter(({ auth }) => !auth)
      .map(({ path, component: Component }) => (
        <Route key={path} path={path} exact>
          <Component />
        </Route>
      ))}
  </Switch>
);

const NoAuthLayout = () => (
  <Layout>
    <Content>
      <Routes />
    </Content>
  </Layout>
);

export default React.memo(NoAuthLayout);
