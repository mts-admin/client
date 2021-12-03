import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import loadable from '../../../utils/loadable';

export default loadable(() => import('./reset-password-page'), {
  fallback: <CircularProgress />,
});
