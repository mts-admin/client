import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Background } from './styled-components';

export const LoaderWithBackground = () => (
  <Background>
    <CircularProgress />
  </Background>
);
