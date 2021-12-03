import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { DateTime } from 'luxon';
import * as R from 'ramda';

import {
  Content,
  Title,
  Row,
  Form,
  FormSection,
  TimeWrapper,
  Buttons,
  ErrorMessage,
} from './styled-components';
import { handleVisitEdit, handleVisitGet } from '../../../store/visits/thunk';
import {
  selectCurrentVisit,
  selectVisitsLoading,
  selectVisitsError,
} from '../../../store/visits/selectors';
import { selectModalPayload, closeCurrentModal } from '../../modal-reducer';
import {
  ControlledInput,
  ControlledTimePicker,
  ControlledDatePicker,
  ControlledSelect,
} from '../../../components/form-items';
import { ButtonPrimary, TextButton } from '../../../components/buttons';
import useEffectAfterMount from '../../../hooks/use-effect-after-mount';
import { VISIT_STATUS } from '../../../constants/visits';
import FormRules from '../../../utils/form-input-rules';
import { capitalizeFirstLetter, getErrorMessage } from '../../../utils/general';
import { setTime } from '../../../utils/date';

const EditVisitModal = () => {
  const dispatch = useDispatch();

  const { scheduleId, visitId, calendarRange } =
    useSelector(selectModalPayload);
  const visit = useSelector(selectCurrentVisit);
  const loading = useSelector(selectVisitsLoading);
  const error = useSelector(selectVisitsError);

  const { control, handleSubmit, reset, watch, setValue } = useForm();

  const [startTime, endTime] = watch(['startTime', 'endTime']);

  useEffect(() => {
    if (
      startTime &&
      endTime &&
      DateTime.fromISO(startTime) > DateTime.fromISO(endTime)
    ) {
      setValue('startTime', endTime);
      setValue('endTime', startTime);
    }
  }, [startTime, endTime, setValue]);

  useEffect(() => {
    dispatch(handleVisitGet({ scheduleId, visitId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectAfterMount(() => {
    reset({
      title: visit.title,
      notes: visit.notes || '',
      startTime: visit.startTime,
      endTime: visit.endTime,
      date: visit.startTime,
      status: visit.status,
    });
  }, [visit]);

  const visitStatusesList = useMemo(
    () =>
      Object.values(VISIT_STATUS).map((elem) => ({
        value: elem,
        label: capitalizeFirstLetter(elem),
      })),
    [],
  );

  const closeModal = () => dispatch(closeCurrentModal());
  const handleFormSubmit = handleSubmit((values) => {
    const data = {
      ...R.omit(['date'], values),
      title: values.title.trim(),
      notes: values.notes.trim(),
      startTime: setTime(values.date, values.startTime),
      endTime: setTime(values.date, values.endTime),
    };

    dispatch(
      handleVisitEdit({
        scheduleId,
        visitId,
        body: data,
        params: calendarRange,
        callback: closeModal,
      }),
    );
  });

  return error ? (
    <ErrorMessage severity="error">{getErrorMessage(error)}</ErrorMessage>
  ) : (
    <Content>
      <Title>Edit visit</Title>

      <Form>
        <Row>
          <FormSection title="Status">
            <ControlledSelect
              data={visitStatusesList}
              control={control}
              name="status"
              label="Status"
            />
          </FormSection>
          <FormSection title="Visit time">
            <TimeWrapper>
              <ControlledTimePicker
                name="startTime"
                label="Start time"
                control={control}
                clearable={false}
                rules={FormRules().required('Please select a start time')}
              />

              <ControlledTimePicker
                name="endTime"
                label="End time"
                control={control}
                clearable={false}
                rules={FormRules().required('Please select an end time')}
              />
            </TimeWrapper>
          </FormSection>
          <FormSection title="Date">
            <ControlledDatePicker
              name="date"
              label="Date"
              control={control}
              clearable={false}
              rules={FormRules().required('Please select a date')}
            />
          </FormSection>
        </Row>

        <Row>
          <FormSection title="General info">
            <ControlledInput
              name="title"
              label="Title"
              control={control}
              rules={FormRules()
                .required('Please enter a title')
                .maxLength(
                  100,
                  'Title must be no more than 100 characters long',
                )}
            />

            <ControlledInput
              name="notes"
              control={control}
              label="Notes"
              multiline
              minRows={3}
              maxRows={10}
            />
          </FormSection>
        </Row>
      </Form>

      <Buttons>
        <TextButton onClick={closeModal} disabled={loading}>
          Cancel
        </TextButton>
        <ButtonPrimary onClick={handleFormSubmit} loading={loading}>
          Edit
        </ButtonPrimary>
      </Buttons>
    </Content>
  );
};

export default EditVisitModal;
