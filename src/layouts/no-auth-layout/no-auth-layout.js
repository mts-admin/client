import React from 'react';
import { node } from 'prop-types';

import { Layout, Content } from './styled-components';

const NoAuthLayout = ({ children }) => (
  <Layout>
    <Content>{children}</Content>
  </Layout>
);

NoAuthLayout.propTypes = {
  children: node.isRequired,
};

export default NoAuthLayout;
