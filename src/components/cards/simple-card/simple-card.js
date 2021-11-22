import React from 'react';
import { string, node, arrayOf, shape, func, bool } from 'prop-types';

import { DotsMenu } from '../../menus';
import { Content, Header, TitleLink, Title } from './styled-components';

const SimpleCard = ({
  link,
  title,
  onClick,
  menuOptions,
  hasAnimation,
  children,
}) => (
  <Content hasanimation={`${hasAnimation}`} onClick={onClick}>
    <Header>
      {link ? <TitleLink to={link}>{title}</TitleLink> : <Title>{title}</Title>}
      {menuOptions && <DotsMenu options={menuOptions} />}
    </Header>

    {children}
  </Content>
);

SimpleCard.propTypes = {
  title: string.isRequired,
  children: node.isRequired,
  link: string,
  onClick: func,
  menuOptions: arrayOf(
    shape({
      label: string.isRequired,
      onClick: func.isRequired,
    }),
  ),
  hasAnimation: bool,
};

export default React.memo(SimpleCard);
