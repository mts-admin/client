import React, { useMemo } from 'react';
import { string, oneOf, number } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import TextTruncate from 'react-text-truncate';

import { Description, Footer, CreatedAt } from './styled-components';
import SimpleCard from '../../../../components/cards/simple-card';
import UserImagesList from '../../../../components/user-images-list';
import { selectSchedule } from '../../../../store/schedules/selectors';
import { openModal } from '../../../../modals/modal-reducer';
import { DYNAMIC_ROUTE } from '../../../../routes/constants';
import { SCHEDULE_TYPE } from '../../../../constants/schedules';
import { getMenuOptions } from './helpers';

const ScheduleCard = ({ id, type, page }) => {
  const dispatch = useDispatch();

  const schedule = useSelector((state) => selectSchedule(state, id));

  const openModalAction = (payload) => dispatch(openModal(payload));

  const options = getMenuOptions({
    id,
    type,
    page,
    openModal: openModalAction,
  });

  const participants = useMemo(
    () =>
      [schedule.owner]
        .concat(schedule.participants.map(({ user }) => user))
        .map((user) => ({ image: user.avatar, name: user.name })),
    [schedule],
  );

  return (
    <SimpleCard
      key={id}
      menuOptions={options}
      title={schedule.name}
      link={DYNAMIC_ROUTE.SCHEDULE(id)}
    >
      {schedule.description && (
        <TextTruncate
          line={2}
          element={Description}
          text={schedule.description}
        />
      )}

      <Footer>
        <UserImagesList images={participants} />
        {schedule.createdAt && (
          <CreatedAt>
            {DateTime.fromISO(schedule.createdAt).toFormat('D')}
          </CreatedAt>
        )}
      </Footer>
    </SimpleCard>
  );
};

ScheduleCard.propTypes = {
  id: string.isRequired,
  page: number.isRequired,
  type: oneOf([SCHEDULE_TYPE.MY, SCHEDULE_TYPE.SHARED]).isRequired,
};

export default React.memo(ScheduleCard);
