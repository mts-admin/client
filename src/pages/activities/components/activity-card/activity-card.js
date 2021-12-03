import React, { useCallback, useMemo } from 'react';
import { object, string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Footer, Text } from './styled-components';
import { handleActivityStatusChange } from '../../../../store/activities/thunk';
import { selectActivity } from '../../../../store/activities/selectors';
import { openModal } from '../../../../modals/modal-reducer';
import UserImagesList from '../../../../components/user-images-list';
import SimpleCard from '../../../../components/cards/simple-card';
import { MODAL_NAME } from '../../../../modals/constants';
import { formatISO } from '../../../../utils/date';
import { ACTIVITY_STATUS } from '../../../../constants/activities';

const getMenuOptions = (status, handleStatusChange) =>
  [
    status !== ACTIVITY_STATUS.ACTIVE.value && {
      label: 'Activate',
      onClick: () =>
        handleStatusChange({ status: ACTIVITY_STATUS.ACTIVE.value }),
    },
    status !== ACTIVITY_STATUS.DONE.value && {
      label: 'Complete',
      onClick: () => handleStatusChange({ status: ACTIVITY_STATUS.DONE.value }),
    },
    status !== ACTIVITY_STATUS.ARCHIVED.value && {
      label: 'Archive',
      onClick: () =>
        handleStatusChange({ status: ACTIVITY_STATUS.ARCHIVED.value }),
    },
  ].filter(Boolean);

const ActivityCard = ({ id, params }) => {
  const dispatch = useDispatch();

  const activity = useSelector((state) => selectActivity(state, id));

  const handleStatusChange = useCallback(
    (body) => dispatch(handleActivityStatusChange({ id, body, params })),
    [id, params, dispatch],
  );

  const menuOptions = useMemo(
    () => getMenuOptions(activity.status, handleStatusChange),
    [activity.status, handleStatusChange],
  );

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
      menuOptions={menuOptions}
      hasAnimation={!activity.viewed}
      minHeight="100px"
    >
      <Footer>
        <Text>{formatISO(activity.becameActiveAt, 'D')}</Text>
        <UserImagesList images={giftedByImage} size="22px" />
      </Footer>
    </SimpleCard>
  );
};

ActivityCard.propTypes = {
  id: string.isRequired,
  params: object.isRequired,
};

export default React.memo(ActivityCard);
