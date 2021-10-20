import React, { useMemo } from 'react';
import { bool, string } from 'prop-types';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  InviteFormContent,
  InviteFormControls,
  InputEmail,
  InviteButton,
  Description,
} from '../styled-components';
import { handleScheduleParticipantAdd } from '../../../../store/schedules/thunk';
import { ControlledCheckboxesGroup } from '../../../../components/form-items';
import { SCHEDULE_PERMISSIONS } from '../../../../constants/permissions';
import FormRules from '../../../../utils/form-input-rules';

const getFormattedCheckboxesState = (checkboxes) =>
  [SCHEDULE_PERMISSIONS.GET.value].concat(
    Object.entries(checkboxes)
      .filter(([_, checked]) => checked)
      .map(([elem]) => elem),
  );

const getDefaultFormState = () => ({
  email: '',
  checkboxes: Object.keys(SCHEDULE_PERMISSIONS)
    .slice(1)
    .reduce((acc, elem) => ({ ...acc, [elem]: false }), {}),
});

const InviteParticipantForm = ({ loading, scheduleId }) => {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm();

  const resetForm = () => reset(getDefaultFormState());

  const onSubmit = handleSubmit(({ email, checkboxes }) => {
    const data = {
      participantEmail: email,
      permissions: getFormattedCheckboxesState(checkboxes),
    };

    dispatch(
      handleScheduleParticipantAdd({
        body: data,
        scheduleId,
        callback: resetForm,
      }),
    );
  });

  const checkboxesList = useMemo(
    () => Object.values(SCHEDULE_PERMISSIONS).slice(1),
    [],
  );

  return (
    <InviteFormContent>
      <InputEmail
        name="email"
        label="Email"
        type="email"
        size="small"
        control={control}
        disabled={loading}
        rules={FormRules().email().required()}
      />
      <InviteFormControls>
        <ControlledCheckboxesGroup
          data={checkboxesList}
          control={control}
          disabled={loading}
          size="small"
        />
        <InviteButton onClick={onSubmit} loading={loading} size="small">
          Invite
        </InviteButton>
      </InviteFormControls>
      <Description>
        * Here you can invite participant by email and select his/her
        permissions. If nothing is selected, then user can only read the
        schedule.
      </Description>
    </InviteFormContent>
  );
};

InviteParticipantForm.propTypes = {
  loading: bool.isRequired,
  scheduleId: string.isRequired,
};

export default InviteParticipantForm;
