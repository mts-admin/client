import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import * as R from 'ramda';

import {
  Text,
  Title,
  Content,
  TextBold,
  ErrorMessage,
  AdditionalInfo,
} from './styled-components';
import {
  selectActivitiesError,
  selectActivitiesLoading,
  selectActivityCurrentItem,
} from '../../../store/activities/selectors';
import { handleMyActivityGet } from '../../../store/activities/thunk';
import { selectModalPayload } from '../../modal-reducer';
import { getComponentState, getErrorMessage } from '../../../utils/general';
import { formatISO } from '../../../utils/date';
import { COMPONENT_STATE } from '../../../constants/general';

const ViewActivityModal = () => {
  const dispatch = useDispatch();

  const { id } = useSelector(selectModalPayload);
  const activity = useSelector(selectActivityCurrentItem);
  const loading = useSelector(selectActivitiesLoading);
  const error = useSelector(selectActivitiesError);

  useEffect(() => {
    dispatch(handleMyActivityGet(id));
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
          <Title>{activity.content}</Title>

          <AdditionalInfo>
            <Text>
              Created by:<TextBold>{activity.createdBy?.name}</TextBold>
            </Text>
            <Text>{formatISO(activity.madeActiveAt, 'D HH:mm')}</Text>
          </AdditionalInfo>
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

export default ViewActivityModal;
