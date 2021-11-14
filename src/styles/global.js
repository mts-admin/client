import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';

const GlobalStyle = createGlobalStyle`
  ${reset}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    background-image: ${({ theme }) => theme.backgrounds.mainBackground};
    line-height: 1.5;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  sup {
    vertical-align: super;
    font-size: smaller;
  }

  sub {
    vertical-align: sub;
    font-size: smaller;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  button.Mui-disabled {
    background: rgba(0, 0, 0, 0.12);
    box-shadow: none;
  }
`;

export default GlobalStyle;
