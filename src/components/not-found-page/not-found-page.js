import React from 'react';

import { Content, Image, ImageWrapper } from './styled-components';

const NotFoundPage = () => (
  <Content>
    <ImageWrapper>
      <Image src="/img/404-not-found.png" alt="Page not found" />
    </ImageWrapper>
  </Content>
);

export default NotFoundPage;
