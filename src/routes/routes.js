import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import AuthRoute from './auth-route';
import routesConfig from './routes-config';
import { ROUTE } from './constants';

// eslint-disable-next-line arrow-body-style
const AppRoutes = () => {
  // TODO: add loader
  return (
    <Switch>
      <Redirect exact from={ROUTE.HOME} to={ROUTE.SCHEDULES} />
      {routesConfig
        .filter(({ auth }) => !auth)
        .map(({ path, Layout, Component }) => (
          <Route key={path} path={path} exact>
            <Layout>
              <Component />
            </Layout>
          </Route>
        ))}
      {routesConfig
        .filter(({ auth }) => auth)
        .map(({ path, Layout, Component }) => (
          <AuthRoute
            key={path}
            path={path}
            // user={user}
            // allowedRoles={allowedRoles}
            exact
          >
            <Layout>
              <Component />
            </Layout>
          </AuthRoute>
        ))}
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
};

export default AppRoutes;
