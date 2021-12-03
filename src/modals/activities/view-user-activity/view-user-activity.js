import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import * as R from 'ramda';

import {
  Content,
  Title,
  Item,
  Section,
  ItemLabel,
  ItemValue,
  ErrorMessage,
} from './styled-components';
import {
  selectActivitiesError,
  selectActivitiesLoading,
  selectActivityCurrentItem,
} from '../../../store/activities/selectors';
import { handleActivityGet } from '../../../store/activities/thunk';
import { selectModalPayload } from '../../modal-reducer';
import { getComponentState, getErrorMessage } from '../../../utils/general';
import { formatISO } from '../../../utils/date';
import { ACTIVITY_STATUS } from '../../../constants/activities';
import { COMPONENT_STATE } from '../../../constants/general';

const ViewUserActivityModal = () => {
  const dispatch = useDispatch();

  const { id } = useSelector(selectModalPayload);
  const activity = useSelector(selectActivityCurrentItem);
  const loading = useSelector(selectActivitiesLoading);
  const error = useSelector(selectActivitiesError);

  useEffect(() => {
    dispatch(handleActivityGet(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Section>
            <Title>{activity.content}</Title>
          </Section>

          <Section>
            <Item>
              <ItemLabel>Status:</ItemLabel>
              <ItemValue>
                {ACTIVITY_STATUS[activity.status]?.label || '-'}
              </ItemValue>
            </Item>
            <Item>
              <ItemLabel>Viewed:</ItemLabel>
              <ItemValue>{activity.viewed ? 'Yes' : 'No'}</ItemValue>
            </Item>
          </Section>

          <Section>
            <Item>
              <ItemLabel>Created by:</ItemLabel>
              <ItemValue>{activity.createdBy?.name}</ItemValue>
            </Item>
            <Item>
              <ItemLabel>Created for:</ItemLabel>
              <ItemValue>{activity.userId?.name}</ItemValue>
            </Item>
            <Item>
              <ItemLabel>Created at:</ItemLabel>
              <ItemValue>{formatISO(activity.createdAt, 'D')}</ItemValue>
            </Item>
            <Item>
              <ItemLabel>Became active at:</ItemLabel>
              <ItemValue>
                {activity.becameActiveAt
                  ? formatISO(activity.becameActiveAt, 'D')
                  : '-'}
              </ItemValue>
            </Item>
          </Section>
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

export default ViewUserActivityModal;
