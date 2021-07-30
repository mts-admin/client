import React from 'react';

import PageLoader from '../../../components/page-loader/page-loader';
import loadable from '../../../utils/loadable';

export default loadable(() => import('./login-page'), {
  fallback: <PageLoader />,
});
