import React from 'react';

import { Content, Image, ImageWrapper } from './styled-components';

const ErrorPage = () => (
  <Content>
    <ImageWrapper>
      <Image src="/img/500-internal-server-error.png" alt="Server error" />
    </ImageWrapper>
  </Content>
);

export default ErrorPage;
