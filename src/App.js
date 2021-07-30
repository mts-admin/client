import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';

import AppRoutes from './routes';
import GlobalStyle from './styles/global';
import store from './store';
import history from './store/history';
import { theme } from './styles/theme';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <GlobalStyle />
          <AppRoutes />
        </StylesProvider>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);

export default App;
