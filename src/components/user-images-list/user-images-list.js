import React from 'react';
import { arrayOf, string, number, shape } from 'prop-types';
import Tooltip from '@mui/material/Tooltip';

import { ContentWrapper, Image, RestCount } from './styled-components';
import { getImageUrl } from '../../utils/general';

const UserImagesList = ({ images, maxCount, size }) => {
  const data = images.slice(0, maxCount);
  const restCount = images.length - maxCount;
  const hasMargin = images.length > 1;

  return (
    <ContentWrapper hasmargin={`${hasMargin}`}>
      {data.map(({ avatar, name }) => (
        <Tooltip key={name} title={name} placement="top">
          <Image src={getImageUrl(avatar)} alt="user avatar" size={size} />
        </Tooltip>
      ))}
      {restCount > 0 && <RestCount size={size}>+{restCount}</RestCount>}
    </ContentWrapper>
  );
};

UserImagesList.propTypes = {
  images: arrayOf(
    shape({
      avatar: string,
      name: string,
    }),
  ).isRequired,
  maxCount: number,
  size: string,
};

UserImagesList.defaultProps = {
  maxCount: 3,
  size: '25px',
};

export default UserImagesList;
