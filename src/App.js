import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';

import AppRoutes from './routes';
import GlobalStyles from './styles/global';
import store from './store';
import history from './store/history';
import { theme } from './styles/theme';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <GlobalStyles />
            <AppRoutes />
          </StylesProvider>
        </MuiThemeProvider>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);

export default App;
