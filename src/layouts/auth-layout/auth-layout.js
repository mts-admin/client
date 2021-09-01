import React from 'react';
import { node } from 'prop-types';

import MainNav from '../../components/main-nav';
import { Layout, Content } from './styled-components';

const AuthLayout = ({ children }) => (
  <Layout>
    <Content>
      <MainNav />
      {children}
    </Content>
  </Layout>
);

AuthLayout.propTypes = {
  children: node.isRequired,
};

export default AuthLayout;
