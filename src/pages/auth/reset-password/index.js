import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import loadable from '../../../utils/loadable';

export default loadable(() => import('./reset-password-page'), {
  fallback: <CircularProgress />,
});
