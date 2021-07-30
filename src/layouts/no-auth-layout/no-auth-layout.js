import React from 'react';
import { node } from 'prop-types';

import { Layout, Wrapper } from './styled-components';

const NoAuthLayout = ({ children }) => (
  <Layout>
    <Wrapper>{children}</Wrapper>
  </Layout>
);

NoAuthLayout.propTypes = {
  children: node.isRequired,
};

export default NoAuthLayout;
