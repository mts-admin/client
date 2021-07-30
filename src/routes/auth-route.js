import React from 'react';
import { node } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { getToken } from '../utils/local-storage';
import { ROUTE } from './constants';

// TODO: create func which will check user permissions
// rest props: user, allowedRoles
const AuthRoute = ({ children, ...rest }) => {
  const isAuthorized = getToken();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
          children
        ) : (
          <Redirect to={{ pathname: ROUTE.LOGIN, state: { from: location } }} />
        )
      }
    />
  );
};

AuthRoute.propTypes = {
  children: node.isRequired,
};

export default AuthRoute;
