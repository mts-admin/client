import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { Background } from './styled-components';

export const LoaderWithBackground = () => (
  <Background>
    <CircularProgress />
  </Background>
);
