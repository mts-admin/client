import React from 'react';
import { arrayOf, string, number, shape } from 'prop-types';
import Tooltip from '@mui/material/Tooltip';

import { ContentWrapper, Image, RestCount } from './styled-components';
import { getImageUrl } from '../../utils/general';

const UserImagesList = ({ images, maxCount }) => {
  const data = images.slice(0, maxCount);
  const restCount = images.length - maxCount;

  return (
    <ContentWrapper>
      {data.map(({ image, name }) => (
        <Tooltip key={name} title={name} placement="top">
          <Image src={getImageUrl(image)} alt="user avatar" />
        </Tooltip>
      ))}
      {restCount > 0 && <RestCount>+{restCount}</RestCount>}
    </ContentWrapper>
  );
};

UserImagesList.propTypes = {
  images: arrayOf(
    shape({
      image: string,
      name: string,
    }),
  ).isRequired,
  maxCount: number,
};

UserImagesList.defaultProps = {
  maxCount: 3,
};

export default UserImagesList;
