import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as R from 'ramda';

import {
  Content,
  Title,
  Row,
  Form,
  FormSection,
  TimeWrapper,
  Buttons,
} from './styled-components';
import {
  handleOneOffVisitCreate,
  handleRecurringVisitsCreate,
} from '../../../store/visits/thunk';
import { selectVisitsLoading } from '../../../store/visits/selectors';
import { selectModalPayload, closeCurrentModal } from '../../modal-reducer';
import {
  ControlledInput,
  ControlledRadioGroup,
  ControlledTimePicker,
  ControlledDatePicker,
  ControlledDateRangePicker,
  ControlledCheckboxesGroup,
} from '../../../components/form-items';
import { ButtonPrimary, TextButton } from '../../../components/buttons';
import { VISIT_RECURRING } from '../../../constants/visits';
import { setTime, getWeekDaysList } from '../../../utils/date';
import FormRules from '../../../utils/form-input-rules';
import { getDefaultState, getRequestData } from './helpers';

const ONE_OFF = VISIT_RECURRING.ONE_OFF.value;
const DAILY = VISIT_RECURRING.DAILY.value;
const WEEKLY = VISIT_RECURRING.WEEKLY.value;

const CreateVisitModal = () => {
  const dispatch = useDispatch();

  const { scheduleId, successCallback, defaultDates, calendarRange } =
    useSelector(selectModalPayload);
  const loading = useSelector(selectVisitsLoading);

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: getDefaultState(defaultDates),
  });

  const [recurring, startTime, endTime] = watch([
    'recurring',
    'startTime',
    'endTime',
  ]);

  useEffect(() => {
    if (startTime && endTime && startTime > endTime) {
      setValue('startTime', endTime);
      setValue('endTime', startTime);
    }
  }, [startTime, endTime, setValue]);

  const visitRecurringList = useMemo(() => Object.values(VISIT_RECURRING), []);
  const daysOfWeek = useMemo(() => getWeekDaysList(), []);

  const closeModal = () => dispatch(closeCurrentModal());

  const handleFormSubmit = handleSubmit((values) => {
    const { action, fields } = getRequestData(
      values.recurring,
      handleOneOffVisitCreate,
      handleRecurringVisitsCreate,
    );
    const formValues = R.pick(fields, values);
    const data = {
      title: formValues.title.trim(),
      notes: formValues.notes.trim(),
      startTime: setTime(formValues.date, formValues.startTime),
      endTime: setTime(formValues.date, formValues.endTime),
      ...(formValues.dateRange && {
        fromDate: formValues.dateRange[0].toString(),
        toDate: formValues.dateRange[1].toString(),
      }),
      ...(formValues.recurring && {
        recurring: formValues.recurring,
      }),
      ...(formValues.daysOfWeek && {
        daysOfWeek: formValues.daysOfWeek.sort(),
      }),
    };

    dispatch(
      action({
        id: scheduleId,
        body: data,
        params: calendarRange,
        callback: () => {
          successCallback && successCallback();
          closeModal();
        },
      }),
    );
  });

  return (
    <Content>
      <Title>Create visit</Title>

      <Form>
        <Row>
          <ControlledRadioGroup
            data={visitRecurringList}
            control={control}
            name="recurring"
            title="Recurring"
          />

          {[WEEKLY].includes(recurring) && (
            <FormSection title="Days of week">
              <ControlledCheckboxesGroup
                name="daysOfWeek"
                data={daysOfWeek}
                control={control}
                size="medium"
                labelPlacement="bottom"
                rules={FormRules().required('Please select days of the week')}
              />
            </FormSection>
          )}

          <FormSection title="Visit time">
            <TimeWrapper>
              <ControlledTimePicker
                name="startTime"
                label="Start time"
                control={control}
                rules={FormRules().required('Please select a start time')}
              />

              <ControlledTimePicker
                name="endTime"
                label="End time"
                control={control}
                rules={FormRules().required('Please select an end time')}
              />
            </TimeWrapper>
          </FormSection>

          <FormSection title="Date">
            {[ONE_OFF].includes(recurring) && (
              <ControlledDatePicker
                name="date"
                label="Date"
                control={control}
                rules={FormRules().required('Please select a date')}
              />
            )}

            {[DAILY, WEEKLY].includes(recurring) && (
              <ControlledDateRangePicker
                name="dateRange"
                control={control}
                rules={FormRules().validate(
                  (value) => value.filter(Boolean).length > 1,
                  'Please select a date range',
                )}
              />
            )}
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
          Create
        </ButtonPrimary>
      </Buttons>
    </Content>
  );
};

export default CreateVisitModal;
