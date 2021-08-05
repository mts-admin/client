import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import loadable from '../../../utils/loadable';

export default loadable(() => import('./register-page'), {
  fallback: <CircularProgress />,
});
