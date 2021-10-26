import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterLuxon';
import { Settings } from 'luxon';

import AppRoutes from './routes';
import GlobalStyles from './styles/global';
import Toast from './components/toast-container';
import store from './store';
import history from './store/history';
import config from './config';
import { theme } from './styles/theme';

Settings.defaultZoneName = config.timezone;

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <GlobalStyles />
            <Toast />
            <AppRoutes />
          </LocalizationProvider>
        </MuiThemeProvider>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);

export default App;
