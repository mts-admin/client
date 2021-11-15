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

  .ql-toolbar.ql-snow {
    border-radius: 4px 4px 0 0;
  }

  .ql-container.ql-snow {
    border-radius:  0 0 4px 4px;
    min-height: 150px;
  }

  .ql-disabled.ql-snow {
    border: none;

    .ql-editor {
      padding: 0;
    }
  }

  .ql-editor ol {
    padding-left: 0
  }

  .ql-editor ul {
    padding-left: 6px
  }

  .ql-toolbar.ql-snow,
  .ql-container.ql-snow {
    border-color: rgba(0, 0, 0, 0.23);
  }

  .quill:hover .ql-toolbar.ql-snow,
  .quill:hover .ql-container.ql-snow {
    border-color: rgba(0, 0, 0, 0.87)
  }

  .quill.has-error {
    .ql-toolbar.ql-snow,
    .ql-container.ql-snow {
      border-color: red
    }
  }
`;

export default GlobalStyle;
