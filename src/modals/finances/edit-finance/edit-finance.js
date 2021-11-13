import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { selectModalPayload, closeCurrentModal } from '../../modal-reducer';
import {
  selectFinancesError,
  selectFinancesLoading,
  selectFinanceCurrentItem,
} from '../../../store/finances/selectors';
import {
  Content,
  Form,
  Row,
  Buttons,
  FormSection,
  DateTimeWrapper,
  ErrorMessage,
} from './styled-components';
import {
  ControlledInput,
  ControlledRadioGroup,
  ControlledDatePicker,
  ControlledInputNumber,
  ControlledTimePicker,
} from '../../../components/form-items';
import {
  handleFinanceGet,
  handleFinanceEdit,
} from '../../../store/finances/thunk';
import { ButtonPrimary, TextButton } from '../../../components/buttons';
import { FINANCE_TYPE } from '../../../constants/finances';
import { capitalizeFirstLetter, getErrorMessage } from '../../../utils/general';
import FormRules from '../../../utils/form-input-rules';
import { setTime } from '../../../utils/date';
import useEffectAfterMount from '../../../hooks/use-effect-after-mount';

const EditFinanceModal = () => {
  const { control, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  const { financeId } = useSelector(selectModalPayload);
  const finance = useSelector(selectFinanceCurrentItem);
  const loading = useSelector(selectFinancesLoading);
  const error = useSelector(selectFinancesError);

  useEffect(() => {
    dispatch(handleFinanceGet(financeId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectAfterMount(() => {
    reset({
      title: finance.title,
      description: finance.description || '',
      type: finance.type,
      total: finance.total,
      date: finance.date,
      time: finance.date,
    });
  }, [finance]);

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
      handleFinanceEdit({
        body,
        id: financeId,
        callback: closeModal,
      }),
    );
  });

  return error ? (
    <ErrorMessage severity="error">{getErrorMessage(error)}</ErrorMessage>
  ) : (
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
                name="date"
                label="Date"
                control={control}
                rules={FormRules().required('Please select a date')}
                clearable={false}
              />
              <ControlledTimePicker
                name="time"
                label="Time"
                control={control}
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
          Edit
        </ButtonPrimary>
      </Buttons>
    </Content>
  );
};

export default EditFinanceModal;
