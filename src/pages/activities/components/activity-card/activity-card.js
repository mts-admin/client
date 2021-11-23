import React from 'react';
import { string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Footer, Text } from './styled-components';
import { selectActivity } from '../../../../store/activities/selectors';
import { openModal } from '../../../../modals/modal-reducer';
import UserImagesList from '../../../../components/user-images-list';
import SimpleCard from '../../../../components/cards/simple-card';
import { MODAL_NAME } from '../../../../modals/constants';
import { formatISO } from '../../../../utils/date';

const ActivityCard = ({ id }) => {
  const dispatch = useDispatch();

  const activity = useSelector((state) => selectActivity(state, id));

  const giftedByImage = [activity.createdBy].filter(Boolean);

  const handleClick = () => {
    dispatch(
      openModal({
        name: MODAL_NAME.VIEW_ACTIVITY,
        payload: { id },
      }),
    );
  };

  return (
    <SimpleCard
      key={id}
      title={activity.content}
      onClick={handleClick}
      hasAnimation={!activity.viewed}
      minHeight="100px"
    >
      <Footer>
        <Text>{formatISO(activity.madeActiveAt, 'D HH:mm')}</Text>
        <UserImagesList images={giftedByImage} size="22px" />
      </Footer>
    </SimpleCard>
  );
};

ActivityCard.propTypes = {
  id: string.isRequired,
};

export default React.memo(ActivityCard);
