import React from 'react';
import { string, arrayOf, shape, func } from 'prop-types';
import LazyLoad from 'react-lazyload';

import { DotsMenu } from '../../menus';
import {
  CardContent,
  CardImageWrapper,
  CardImage,
  CardTextWrapper,
  CardName,
  CardDescription,
} from './styled-components';
import { getImageUrl } from '../../../utils/general';

const UserCard = ({ name, image, description, menuOptions, ...rest }) => (
  <CardContent {...rest}>
    <CardImageWrapper>
      <LazyLoad>
        <CardImage src={getImageUrl(image)} alt={`${name}'s avatar'`} />
      </LazyLoad>
    </CardImageWrapper>

    <CardTextWrapper>
      <CardName>{name}</CardName>
      {description && <CardDescription>{description}</CardDescription>}
    </CardTextWrapper>

    {menuOptions && <DotsMenu options={menuOptions} />}
  </CardContent>
);

UserCard.propTypes = {
  name: string,
  image: string,
  description: string,
  menuOptions: arrayOf(
    shape({
      label: string.isRequired,
      onClick: func.isRequired,
    }),
  ),
};

export default React.memo(UserCard);
