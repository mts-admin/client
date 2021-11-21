import React, { useState } from 'react';
import { string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import {
  handleTaskDelete,
  handleTaskEdit,
} from '../../../../store/tasks/thunk';
import { selectTask } from '../../../../store/tasks/selectors';
import { Content, TextWrapper, Text, Buttons } from './styled-components';
import useEffectAfterMount from '../../../../hooks/use-effect-after-mount';
import useCancelToken from '../../../../hooks/use-cancel-token';
import { ControlledInput } from '../../../../components/form-items';
import { TASK_STATUS } from '../../../../constants/sprints';

const TaskItem = ({ id }) => {
  const dispatch = useDispatch();

  const { id: sprintId } = useParams();

  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  const task = useSelector((state) => selectTask(state, id));

  const { control, watch } = useForm({
    defaultValues: {
      checked: task.status === TASK_STATUS.DONE,
      title: task.title || '',
    },
  });

  const [checked, title] = watch(['checked', 'title']);

  const toggleEditable = () => setEditable((prevState) => !prevState);

  const deleteTask = () => {
    setLoading(true);
    dispatch(
      handleTaskDelete({
        sprintId,
        taskId: id,
        callback: () => setLoading(false),
      }),
    );
  };
  const editTask = (body, cancelToken) => {
    setLoading(true);
    dispatch(
      handleTaskEdit({
        sprintId,
        taskId: id,
        body,
        cancelToken,
        callback: () => setLoading(false),
      }),
    );
  };

  const handleBlur = () => {
    if (title.length === 0) {
      deleteTask();
    } else {
      title !== task.title && editTask({ title });
      toggleEditable();
    }
  };

  const [generateCancelToken, cancelRequest] = useCancelToken();

  useEffectAfterMount(() => {
    cancelRequest();

    editTask(
      { status: checked ? TASK_STATUS.DONE : TASK_STATUS.ACTIVE },
      generateCancelToken(),
    );

    return () => cancelRequest();
  }, [checked]);

  return (
    <Content>
      <Controller
        name="checked"
        control={control}
        render={({ field }) => (
          <Checkbox checked={!!field.value} onChange={field.onChange} />
        )}
      />

      <TextWrapper>
        {editable ? (
          <ControlledInput
            name="title"
            control={control}
            onBlur={handleBlur}
            variant="standard"
            inputProps={{ maxLength: 100 }}
            autoFocus
          />
        ) : (
          <Text checked={checked}>{title}</Text>
        )}
      </TextWrapper>

      {!editable && (
        <Buttons>
          <IconButton size="small" onClick={toggleEditable} disabled={loading}>
            <EditIcon fontSize="10px" />
          </IconButton>
          <IconButton size="small" onClick={deleteTask} disabled={loading}>
            <DeleteOutlineIcon fontSize="10px" />
          </IconButton>
        </Buttons>
      )}
    </Content>
  );
};

TaskItem.propTypes = {
  id: string.isRequired,
};

export default React.memo(TaskItem);
