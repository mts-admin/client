import React, { useCallback, useMemo } from 'react';
import { object, string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import history from '../../../../store/history';
import { selectSprint } from '../../../../store/sprints/selectors';
import { openModal } from '../../../../modals/modal-reducer';
import SimpleCard from '../../../../components/cards/simple-card';
import {
  Progress,
  ProgressWrapper,
  ProgressText,
  ProgressLabel,
  ProgressValue,
  TagsWrapper,
  Footer,
} from './styled-components';
import SimpleTag from '../../../../components/simple-tag';
import { DYNAMIC_ROUTE } from '../../../../routes/constants';
import { MODAL_NAME } from '../../../../modals/constants';
import { SPRINT_PRIORITY, SPRINT_STATUS } from '../../../../constants/sprints';
import { formatISO } from '../../../../utils/date';
import { COLORS } from '../../../../styles/theme';

const PRIORITY_COLORS = {
  LOW: COLORS.BLUE,
  MEDIUM: COLORS.SUCCESS,
  HIGH: COLORS.ERROR,
};

const STATUS_COLORS = {
  IN_PROGRESS: COLORS.BLUE,
  DONE: COLORS.SUCCESS,
  EXPIRED: COLORS.ERROR,
  ARCHIVED: COLORS.GREY,
};

const getMenuOptions = (id, params, handleModalOpen) => [
  {
    label: 'View more',
    onClick: () => history.push(DYNAMIC_ROUTE.SPRINT(id)),
  },
  {
    label: 'Edit',
    onClick: () =>
      handleModalOpen({
        name: MODAL_NAME.EDIT_SPRINT,
        payload: { id, params },
      }),
  },
  {
    label: 'Delete',
    onClick: () =>
      handleModalOpen({
        name: MODAL_NAME.DELETE_SPRINT,
        payload: { id, params },
      }),
  },
];

const SprintCard = ({ id, params }) => {
  const dispatch = useDispatch();

  const sprint = useSelector((state) => selectSprint(state, id));

  const handleModalOpen = useCallback(
    (payload) => dispatch(openModal(payload)),
    [dispatch],
  );

  const menuOptions = useMemo(
    () => getMenuOptions(id, params, handleModalOpen),
    [id, params, handleModalOpen],
  );

  const { completedTasksCount, totalTasksCount } = sprint;

  const status = SPRINT_STATUS[sprint.status].label;
  const priority = SPRINT_PRIORITY[sprint.priority].label;

  const statusColor = STATUS_COLORS[sprint.status];
  const priorityColor = PRIORITY_COLORS[sprint.priority];

  const progressValue = completedTasksCount / totalTasksCount || 0;
  const progressColor =
    completedTasksCount === totalTasksCount ? 'success' : 'primary';

  return (
    <SimpleCard
      key={id}
      menuOptions={menuOptions}
      title={sprint.title}
      link={DYNAMIC_ROUTE.SPRINT(id)}
    >
      <TagsWrapper>
        <SimpleTag color={statusColor} type="contained">
          {status}
        </SimpleTag>
        <SimpleTag color={priorityColor} type="outlined">
          {priority}
        </SimpleTag>
      </TagsWrapper>

      <ProgressWrapper>
        <ProgressText>
          <ProgressLabel>Tasks done:</ProgressLabel>
          <ProgressValue>
            {completedTasksCount} / {totalTasksCount}
          </ProgressValue>
        </ProgressText>
        <Progress
          variant="determinate"
          color={progressColor}
          value={progressValue}
        />
      </ProgressWrapper>

      <Footer>
        <SimpleTag color={COLORS.ERROR} type="contained">
          Due date: {formatISO(sprint.dueDate, 'dd/MM/yy')}
        </SimpleTag>
      </Footer>
    </SimpleCard>
  );
};

SprintCard.propTypes = {
  id: string.isRequired,
  params: object.isRequired,
};

export default React.memo(SprintCard);
