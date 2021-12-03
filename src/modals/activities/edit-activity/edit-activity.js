import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  handleActivityEdit,
  handleActivityGet,
} from '../../../store/activities/thunk';
import {
  selectActivitiesError,
  selectActivitiesLoading,
  selectActivityCurrentItem,
} from '../../../store/activities/selectors';
import { closeCurrentModal, selectModalPayload } from '../../modal-reducer';
import {
  ControlledInput,
  ControlledSelect,
} from '../../../components/form-items';
import { ButtonPrimary } from '../../../components/buttons';
import FormRules from '../../../utils/form-input-rules';
import {
  Form,
  Title,
  Content,
  Buttons,
  CancelButton,
  ErrorMessage,
} from './styled-components';
import { ACTIVITY_STATUS } from '../../../constants/activities';
import useEffectAfterMount from '../../../hooks/use-effect-after-mount';
import { getErrorMessage } from '../../../utils/general';

const EditActivityModal = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm();

  const { id } = useSelector(selectModalPayload);
  const activity = useSelector(selectActivityCurrentItem);
  const loading = useSelector(selectActivitiesLoading);
  const error = useSelector(selectActivitiesError);

  useEffect(() => {
    dispatch(handleActivityGet(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectAfterMount(() => {
    reset({
      content: activity.content,
      status: activity.status,
    });
  }, [activity]);

  const closeModal = () => dispatch(closeCurrentModal());
  const onSubmit = handleSubmit((body) => {
    dispatch(handleActivityEdit({ id, body, callback: closeModal }));
  });

  const statusList = useMemo(() => Object.values(ACTIVITY_STATUS), []);

  return error ? (
    <ErrorMessage severity="error">{getErrorMessage(error)}</ErrorMessage>
  ) : (
    <Content>
      <Title>Edit activity</Title>

      <Form onSubmit={onSubmit}>
        <ControlledInput
          name="content"
          label="Content"
          control={control}
          rules={FormRules()
            .maxLength(500, 'Content must be no more than 500 characters long')
            .required('Please enter the content')}
        />

        <ControlledSelect
          data={statusList}
          control={control}
          name="status"
          label="Status"
          rules={FormRules().required('Please select a status')}
        />

        <Buttons>
          <CancelButton onClick={closeModal} disabled={loading}>
            Cancel
          </CancelButton>
          <ButtonPrimary loading={loading} type="submit">
            Edit
          </ButtonPrimary>
        </Buttons>
      </Form>
    </Content>
  );
};

export default EditActivityModal;
