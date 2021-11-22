import React from 'react';
import { string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import TextTruncate from 'react-text-truncate';

import { Description, Footer, Text } from './styled-components';
import { selectBonus } from '../../../../store/bonuses/selectors';
import { openModal } from '../../../../modals/modal-reducer';
import UserImagesList from '../../../../components/user-images-list';
import SimpleCard from '../../../../components/cards/simple-card';
import { MODAL_NAME } from '../../../../modals/constants';
import { formatISO } from '../../../../utils/date';

const BonusCard = ({ id }) => {
  const dispatch = useDispatch();

  const bonus = useSelector((state) => selectBonus(state, id));

  const giftedByImage = [bonus.createdBy].filter(Boolean);

  const handleClick = () => {
    dispatch(
      openModal({
        name: MODAL_NAME.VIEW_BONUS,
        payload: { id },
      }),
    );
  };

  return (
    <SimpleCard
      key={id}
      title={bonus.title}
      onClick={handleClick}
      hasAnimation={!bonus.viewed}
    >
      <TextTruncate line={3} element={Description} text={bonus.description} />

      <Footer>
        <Text>{formatISO(bonus.createdAt, 'D HH:mm')}</Text>
        <UserImagesList images={giftedByImage} size="22px" />
      </Footer>
    </SimpleCard>
  );
};

BonusCard.propTypes = {
  id: string.isRequired,
};

export default React.memo(BonusCard);
