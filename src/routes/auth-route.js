import React from 'react';
import { arrayOf, node, string } from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { selectAuthUserRole } from '../store/auth/selectors';
import { getToken } from '../utils/local-storage';
import { ROUTE } from './constants';

const AuthRoute = ({ children, allowedRoles, ...rest }) => {
  const isAuthorized = getToken();
  const userRole = useSelector(selectAuthUserRole);

  if (!isAuthorized) {
    return <Redirect to={ROUTE.LOGIN} />;
  }

  if (userRole && allowedRoles && !allowedRoles.includes(userRole)) {
    return <Redirect to={ROUTE.HOME} />;
  }

  return <Route {...rest}>{children}</Route>;
};

AuthRoute.propTypes = {
  children: node.isRequired,
  allowedRoles: arrayOf(string),
};

export default AuthRoute;
