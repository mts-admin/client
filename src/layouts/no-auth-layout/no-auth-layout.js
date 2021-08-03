import React from 'react';
import { node } from 'prop-types';
import { ToastContainer } from 'react-toastify';

import { Layout, Content } from './styled-components';

const NoAuthLayout = ({ children }) => (
  <Layout>
    <Content>{children}</Content>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      limit={3}
      pauseOnFocusLoss
      hideProgressBar
      pauseOnHover
      closeOnClick
      newestOnTop
      draggable
    />
  </Layout>
);

NoAuthLayout.propTypes = {
  children: node.isRequired,
};

export default NoAuthLayout;
