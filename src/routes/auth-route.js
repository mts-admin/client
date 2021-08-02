import React from 'react';
import { node } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { getToken } from '../utils/local-storage';
import { ROUTE } from './constants';

// TODO: create func which will check user permissions
// rest props: user, allowedRoles
const AuthRoute = ({ children, ...rest }) => {
  const isAuthorized = getToken();

  if (!isAuthorized) {
    return <Redirect to={ROUTE.LOGIN} />;
  }

  return <Route {...rest}>{children}</Route>;
};

AuthRoute.propTypes = {
  children: node.isRequired,
};

export default AuthRoute;
