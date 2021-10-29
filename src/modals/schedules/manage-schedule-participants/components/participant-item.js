import React, { useCallback, useMemo, useState } from 'react';
import { shape, arrayOf, string, bool } from 'prop-types';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';

import {
  ParticipantItemContent,
  ParticipantItemCheckboxes,
  ParticipantItemButtons,
} from '../styled-components';
import {
  handleScheduleParticipantEdit,
  handleScheduleParticipantDelete,
} from '../../../../store/schedules/thunk';
import UserCard from '../../../../components/user-card';
import { ControlledCheckboxesGroup } from '../../../../components/form-items';
import { TextButton } from '../../../../components/buttons';
import { getSchedulePermissionsLabels } from '../../../../utils/permissions';
import { SCHEDULE_PERMISSIONS } from '../../../../constants/permissions';

const getMenuOptions = ({ onEdit, onDelete }) => [
  {
    label: 'Change permissions',
    onClick: onEdit,
  },
  {
    label: 'Delete',
    onClick: onDelete,
  },
];

const ParticipantItem = ({ user, permissions, scheduleId, disabled }) => {
  const dispatch = useDispatch();

  const [editable, setEditable] = useState(false);

  const { control, reset, handleSubmit } = useForm({
    defaultValues: { permissions },
  });

  const toggleEditable = () => setEditable((prevState) => !prevState);

  const onSave = handleSubmit((values) => {
    const data = {
      participantId: user.id,
      permissions: values.permissions,
    };

    dispatch(
      handleScheduleParticipantEdit({
        body: data,
        scheduleId,
        callback: toggleEditable,
      }),
    );
  });
  const onCancel = () => {
    reset({ permissions });
    toggleEditable();
  };
  const onDelete = useCallback(() => {
    const data = {
      participantId: user.id,
    };
    dispatch(handleScheduleParticipantDelete({ body: data, scheduleId }));
  }, [dispatch, user, scheduleId]);

  const menuOptions = useMemo(
    () => getMenuOptions({ onEdit: toggleEditable, onDelete }),
    [onDelete],
  );
  const checkboxesList = useMemo(
    () => Object.values(SCHEDULE_PERMISSIONS).slice(1),
    [],
  );

  return (
    <ParticipantItemContent key={user.id}>
      <UserCard
        name={user.name}
        image={user.avatar}
        menuOptions={menuOptions}
        description={getSchedulePermissionsLabels(permissions)}
      />

      {editable && (
        <ParticipantItemCheckboxes>
          <ControlledCheckboxesGroup
            data={checkboxesList}
            name="permissions"
            control={control}
            disabled={disabled}
            size="small"
          />
          <ParticipantItemButtons>
            <TextButton onClick={onCancel} size="small">
              Cancel
            </TextButton>
            <Button variant="contained" onClick={onSave}>
              Update
            </Button>
          </ParticipantItemButtons>
        </ParticipantItemCheckboxes>
      )}
    </ParticipantItemContent>
  );
};

ParticipantItem.propTypes = {
  user: shape({
    id: string.isRequired,
    name: string.isRequired,
    avatar: string,
  }).isRequired,
  permissions: arrayOf(string).isRequired,
  scheduleId: string.isRequired,
  disabled: bool,
};

export default React.memo(ParticipantItem);
