import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import * as R from 'ramda';

import useTasksPageContainer from './container';
import {
  Title,
  Content,
  Header,
  Buttons,
  ButtonBack,
  ButtonEdit,
  ButtonDelete,
  Description,
  EmptyMessage,
  Tags,
} from './styled-components';
import TaskItem from './components/task-item';
import AddTaskForm from './components/add-task-form';
import SimpleTag from '../../components/simple-tag';
import SimpleMessage from '../../components/simple-message';
import { COMPONENT_STATE } from '../../constants/general';
import { formatISO } from '../../utils/date';
import { COLORS } from '../../styles/theme';

const TasksPage = () => {
  const {
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
  } = useTasksPageContainer();

  return (
    <Content>
      {R.cond([
        [R.equals(COMPONENT_STATE.LOADING), () => <CircularProgress />],
        [
          R.equals(COMPONENT_STATE.ERROR),
          () => <SimpleMessage title={errorMessage} error />,
        ],
        [
          R.equals(COMPONENT_STATE.SUCCESS),
          () => (
            <>
              <Header>
                <ButtonBack onClick={handleBackButtonClick}>Back</ButtonBack>

                <Buttons>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleCompleteButtonClick}
                  >
                    Complete
                  </Button>
                  <ButtonEdit
                    variant="outlined"
                    color="primary"
                    onClick={handleEditButtonClick}
                  >
                    Edit
                  </ButtonEdit>
                  <ButtonDelete
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteButtonClick}
                  >
                    Delete
                  </ButtonDelete>
                </Buttons>
              </Header>

              <Title>{sprint.title}</Title>

              <Tags>
                <SimpleTag color={statusColor} type="contained">
                  Status: {status}
                </SimpleTag>
                <SimpleTag color={priorityColor} type="contained">
                  Priority: {priority}
                </SimpleTag>
                <SimpleTag color={COLORS.ERROR} type="contained">
                  Due date: {formatISO(sprint.dueDate, 'dd/MM/yy')}
                </SimpleTag>
              </Tags>

              <Description
                lines={2}
                more="Show more"
                less="Show less"
                truncatedEndingComponent="... "
              >
                {sprint.description}
              </Description>

              <AddTaskForm />

              {tasks.length === 0 && (
                <EmptyMessage>
                  You haven&#39;t created any tasks yet
                </EmptyMessage>
              )}

              {tasks.map((id) => (
                <TaskItem key={id} id={id} />
              ))}
            </>
          ),
        ],
      ])(componentState)}
    </Content>
  );
};

export default TasksPage;
