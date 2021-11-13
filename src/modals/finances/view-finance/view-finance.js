import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import * as R from 'ramda';

import {
  Content,
  Title,
  Section,
  Item,
  ItemLabel,
  ItemsGroup,
  ErrorMessage,
} from './styled-components';
import { selectModalPayload } from '../../modal-reducer';
import {
  selectFinancesError,
  selectFinancesLoading,
  selectFinanceCurrentItem,
} from '../../../store/finances/selectors';
import { handleFinanceGet } from '../../../store/finances/thunk';
import { getComponentState, getErrorMessage } from '../../../utils/general';
import { formatISO } from '../../../utils/date';
import { COMPONENT_STATE } from '../../../constants/general';
import { FINANCE_TYPE } from '../../../constants/finances';
import { COLORS } from '../../../styles/theme';

// total (color by type), date, createdAt
const ViewFinanceModal = () => {
  const dispatch = useDispatch();

  const { financeId } = useSelector(selectModalPayload);
  const finance = useSelector(selectFinanceCurrentItem);
  const loading = useSelector(selectFinancesLoading);
  const error = useSelector(selectFinancesError);

  useEffect(() => {
    dispatch(handleFinanceGet(financeId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const description = finance.description || '-';
  const total = R.cond([
    [R.equals(FINANCE_TYPE.INCOME), () => `+${finance.total}`],
    [R.equals(FINANCE_TYPE.OUTCOME), () => `-${finance.total}`],
  ])(finance.type);
  const totalColor = R.cond([
    [R.equals(FINANCE_TYPE.INCOME), () => COLORS.SUCCESS],
    [R.equals(FINANCE_TYPE.OUTCOME), () => COLORS.ERROR],
  ])(finance.type);
  const date = formatISO(finance.date, 'D HH:mm');
  const createdAt =
    finance.createdAt && formatISO(finance.createdAt, 'D HH:mm');

  const componentState = useMemo(
    () => getComponentState(loading, error),
    [loading, error],
  );

  return R.cond([
    [R.equals(COMPONENT_STATE.LOADING), () => <CircularProgress />],
    [
      R.equals(COMPONENT_STATE.SUCCESS),
      () => (
        <Content>
          <Title>Finance details</Title>

          <Section>
            <Item>
              <ItemLabel>Title: </ItemLabel>
              {finance.title}
            </Item>
            <Item>
              <ItemLabel>Description: </ItemLabel>
              {description}
            </Item>
          </Section>

          <Section>
            <ItemsGroup>
              <Item color={totalColor}>
                <ItemLabel type="icon">
                  <AttachMoneyIcon />
                </ItemLabel>
                {total}
              </Item>
              <Item>
                <ItemLabel type="icon">
                  <CalendarTodayIcon />
                </ItemLabel>
                {date}
              </Item>
            </ItemsGroup>
          </Section>

          {createdAt && (
            <Section>
              <Item>
                <ItemLabel>Created at: </ItemLabel>
                {createdAt}
              </Item>
            </Section>
          )}
        </Content>
      ),
    ],
    [
      R.equals(COMPONENT_STATE.ERROR),
      () => (
        <ErrorMessage severity="error">{getErrorMessage(error)}</ErrorMessage>
      ),
    ],
  ])(componentState);
};

export default ViewFinanceModal;
