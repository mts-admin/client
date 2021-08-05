import React, { useEffect } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import AuthRoute from './auth-route';
import routesConfig from './routes-config';
import { handleGetMe } from '../store/auth/thunk';
import { selectAuthUser, selectInitLoading } from '../store/auth/selectors';
import { getToken } from '../utils/local-storage';
import { ROUTE } from './constants';

const AppRoutes = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const initLoading = useSelector(selectInitLoading);

  useEffect(() => {
    getToken() && dispatch(handleGetMe());
  }, [dispatch]);

  return initLoading ? (
    <CircularProgress />
  ) : (
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
        .map(({ path, allowedRoles, Layout, Component }) => (
          <AuthRoute
            key={path}
            path={path}
            user={user}
            allowedRoles={allowedRoles}
            exact
          >
            <Layout>
              <Component />
            </Layout>
          </AuthRoute>
        ))}
      {/* TODO: add 404 and 500 error pages */}
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
};

export default AppRoutes;
