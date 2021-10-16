import React from 'react';
import { string, node, arrayOf, shape, func } from 'prop-types';

import DotsMenu from '../../dots-menu';
import { Content, Header, TitleLink } from './styled-components';

const SimpleCard = ({ link, title, menuOptions, children }) => (
  <Content>
    <Header>
      <TitleLink to={link}>{title}</TitleLink>
      {menuOptions && <DotsMenu options={menuOptions} />}
    </Header>

    {children}
  </Content>
);

SimpleCard.propTypes = {
  link: string.isRequired,
  title: string.isRequired,
  children: node.isRequired,
  menuOptions: arrayOf(
    shape({
      label: string.isRequired,
      onClick: func.isRequired,
    }),
  ),
};

export default React.memo(SimpleCard);
