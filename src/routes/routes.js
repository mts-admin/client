import React, { useEffect } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

import NoAuthLayout from '../layouts/no-auth-layout';
import AuthLayout from '../layouts/auth-layout';
import { handleGetMe } from '../store/auth/thunk';
import { selectInitLoading } from '../store/auth/selectors';
import { getToken } from '../utils/local-storage';
import { ROUTE } from './constants';

const AppRoutes = () => {
  const dispatch = useDispatch();
  const initLoading = useSelector(selectInitLoading);

  useEffect(() => {
    getToken() && dispatch(handleGetMe());
  }, [dispatch]);

  return initLoading ? (
    <CircularProgress />
  ) : (
    <Switch>
      <Redirect exact from={ROUTE.HOME} to={ROUTE.SCHEDULES} />
      <Redirect exact from="/auth" to={ROUTE.LOGIN} />
      <Redirect exact from="/dashboard" to={ROUTE.SCHEDULES} />

      <Route path="/auth">
        <NoAuthLayout />
      </Route>

      <Route path="/dashboard">
        <AuthLayout />
      </Route>

      {/* TODO: add 404 and 500 error pages */}
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
};

export default AppRoutes;
