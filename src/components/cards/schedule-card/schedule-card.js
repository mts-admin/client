import React from 'react';
import { oneOf, string, number } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import TextTruncate from 'react-text-truncate';
import { DateTime } from 'luxon';

import DotsMenu from '../../dots-menu';
import UserImagesList from '../../user-images-list/user-images-list';
import {
  Content,
  Header,
  Description,
  TitleLink,
  Footer,
  CreatedAt,
} from './styled-components';
import { selectSchedule } from '../../../store/schedules/selectors';
import { SCHEDULE_TYPE } from '../../../constants/schedules';
import { DYNAMIC_ROUTE } from '../../../routes/constants';
import { getMenuOptions } from './helpers';
import { openModal } from '../../../modals/modal-reducer';

const ScheduleCard = ({ id, page, type }) => {
  const dispatch = useDispatch();

  const schedule = useSelector((state) => selectSchedule(state, id));

  const openModalAction = (payload) => dispatch(openModal(payload));

  const options = getMenuOptions({
    id,
    type,
    page,
    openModal: openModalAction,
  });
  const participants = [schedule.owner]
    .concat(schedule.participants.map(({ user }) => user))
    .map((user) => ({ image: user.avatar, name: user.name }));

  return (
    <Content key={id}>
      <Header>
        <TitleLink to={DYNAMIC_ROUTE.SCHEDULE(id)}>{schedule.name}</TitleLink>
        <DotsMenu options={options} />
      </Header>

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
    </Content>
  );
};

ScheduleCard.propTypes = {
  id: string.isRequired,
  page: number.isRequired,
  type: oneOf([SCHEDULE_TYPE.MY, SCHEDULE_TYPE.SHARED]).isRequired,
};

export default React.memo(ScheduleCard);
