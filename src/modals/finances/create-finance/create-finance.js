import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { DateTime } from 'luxon';

import { selectModalPayload, closeCurrentModal } from '../../modal-reducer';
import { selectFinancesLoading } from '../../../store/finances/selectors';
import {
  Content,
  Form,
  Row,
  Buttons,
  FormSection,
  DateTimeWrapper,
} from './styled-components';
import {
  ControlledInput,
  ControlledRadioGroup,
  ControlledDatePicker,
  ControlledInputNumber,
  ControlledTimePicker,
} from '../../../components/form-items';
import { handleFinanceCreate } from '../../../store/finances/thunk';
import { ButtonPrimary, TextButton } from '../../../components/buttons';
import { FINANCE_TYPE } from '../../../constants/finances';
import { capitalizeFirstLetter } from '../../../utils/general';
import FormRules from '../../../utils/form-input-rules';
import { setTime } from '../../../utils/date';

const CreateFinanceModal = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      type: FINANCE_TYPE.INCOME,
      date: DateTime.now(),
      time: DateTime.now(),
    },
  });

  const dispatch = useDispatch();

  const { callback, cancelToken } = useSelector(selectModalPayload);
  const loading = useSelector(selectFinancesLoading);

  const financeTypesList = useMemo(
    () =>
      Object.values(FINANCE_TYPE).map((elem) => ({
        value: elem,
        label: capitalizeFirstLetter(elem),
      })),
    [],
  );

  const closeModal = () => dispatch(closeCurrentModal());
  const handleFormSubmit = handleSubmit((values) => {
    const { title, description, type, total, date, time } = values;

    const body = {
      title: title.trim(),
      description: description.trim(),
      type,
      total: Number(total),
      date: setTime(date, time),
    };

    dispatch(
      handleFinanceCreate({
        body,
        callback: () => {
          closeModal();
          callback && callback();
        },
        cancelToken,
      }),
    );
  });

  return (
    <Content>
      <Form>
        <Row>
          <ControlledRadioGroup
            data={financeTypesList}
            control={control}
            name="type"
            title="Type"
            rules={FormRules().required('Please select a type')}
          />

          <FormSection title="Total amount">
            <ControlledInputNumber
              control={control}
              name="total"
              label="Total amount"
              rules={FormRules().required('Please enter the total amount')}
              fullWidth={false}
            />
          </FormSection>

          <FormSection title="Date and time">
            <DateTimeWrapper>
              <ControlledDatePicker
                control={control}
                name="date"
                label="Date"
                rules={FormRules().required('Please select a date')}
                clearable={false}
              />
              <ControlledTimePicker
                control={control}
                name="time"
                label="Time"
                rules={FormRules().required('Please select a time')}
                clearable={false}
              />
            </DateTimeWrapper>
          </FormSection>
        </Row>

        <Row>
          <FormSection title="General info">
            <ControlledInput
              control={control}
              name="title"
              label="Title"
              rules={FormRules().required('Please enter a title')}
            />

            <ControlledInput
              control={control}
              name="description"
              label="Description"
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

export default CreateFinanceModal;
