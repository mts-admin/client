import React from 'react';
import { string, node } from 'prop-types';

import { Content, Title } from './styled-components';

const ContentSection = ({ title, children, ...rest }) => (
  <Content {...rest}>
    <Title>{title}</Title>
    {children}
  </Content>
);

ContentSection.propTypes = {
  title: string.isRequired,
  children: node.isRequired,
};

export default React.memo(ContentSection);
