import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import { handleTasksGet } from '../../store/tasks/thunk';
import {
  handleSprintGet,
  handleSprintComplete,
} from '../../store/sprints/thunk';
import {
  selectTasks,
  selectTasksInitLoading,
} from '../../store/tasks/selectors';
import {
  selectCurrentSprint,
  selectSprintsError,
  selectSprintsLoading,
} from '../../store/sprints/selectors';
import { openModal } from '../../modals/modal-reducer';
import { clearTasks } from '../../store/tasks/actions';
import { getComponentState, getErrorMessage } from '../../utils/general';
import {
  SPRINT_STATUS,
  SPRINT_PRIORITY,
  SPRINT_STATUS_COLORS,
  SPRINT_PRIORITY_COLORS,
} from '../../constants/sprints';
import { ROUTE } from '../../routes/constants';
import { MODAL_NAME } from '../../modals/constants';

const useTasksPageContainer = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { push } = useHistory();

  const sprint = useSelector(selectCurrentSprint);
  const sprintLoading = useSelector(selectSprintsLoading);
  const sprintError = useSelector(selectSprintsError);
  const tasks = useSelector(selectTasks);
  const tasksLoading = useSelector(selectTasksInitLoading);

  const loading = sprintLoading || tasksLoading;

  const status = SPRINT_STATUS[sprint.status]?.label;
  const priority = SPRINT_PRIORITY[sprint.priority]?.label;
  const statusColor = SPRINT_STATUS_COLORS[sprint.status] || '';
  const priorityColor = SPRINT_PRIORITY_COLORS[sprint.priority] || '';

  useEffect(() => {
    dispatch(handleSprintGet(id));
    dispatch(handleTasksGet(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => dispatch(clearTasks()), [dispatch]);

  const handleCompleteButtonClick = () => dispatch(handleSprintComplete(id));
  const handleEditButtonClick = () =>
    dispatch(
      openModal({
        name: MODAL_NAME.EDIT_SPRINT,
        payload: { id },
      }),
    );
  const handleDeleteButtonClick = () =>
    dispatch(
      openModal({
        name: MODAL_NAME.DELETE_SPRINT,
        payload: { id },
      }),
    );
  const handleBackButtonClick = () => push(ROUTE.SPRINTS);

  const componentState = useMemo(
    () => getComponentState(loading, sprintError),
    [loading, sprintError],
  );

  const errorMessage = getErrorMessage(sprintError);

  return {
    tasks,
    sprint,
    status,
    priority,
    statusColor,
    priorityColor,
    errorMessage,
    componentState,
    handleBackButtonClick,
    handleEditButtonClick,
    handleDeleteButtonClick,
    handleCompleteButtonClick,
  };
};

export default useTasksPageContainer;
