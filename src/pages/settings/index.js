import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import loadable from '../../utils/loadable';

export default loadable(() => import('./settings-page'), {
  fallback: <CircularProgress />,
});
