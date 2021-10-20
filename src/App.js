import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
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
          <StylesProvider injectFirst>
            <GlobalStyles />
            <Toast />
            <AppRoutes />
          </StylesProvider>
        </MuiThemeProvider>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);

export default App;
