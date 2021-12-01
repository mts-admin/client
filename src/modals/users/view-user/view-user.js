import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MailIcon from '@mui/icons-material/Mail';
import CircularProgress from '@mui/material/CircularProgress';
import * as R from 'ramda';

import {
  Content,
  Title,
  Section,
  MainInfo,
  ImageWrapper,
  Image,
  Text,
  Name,
  Email,
  Item,
  ItemLabel,
  ItemValue,
  ErrorMessage,
} from './styled-components';
import {
  selectUserCurrentItem,
  selectUsersError,
  selectUsersLoading,
} from '../../../store/users/selectors';
import { handleUserGet } from '../../../store/users/thunk';
import { selectModalPayload } from '../../modal-reducer';
import {
  getComponentState,
  getErrorMessage,
  getImageUrl,
} from '../../../utils/general';
import { formatISO } from '../../../utils/date';
import { COMPONENT_STATE } from '../../../constants/general';
import {
  USER_ROLE_FILTERS,
  USER_STATUS_FILTERS,
} from '../../../constants/users';

const ViewUserModal = () => {
  const dispatch = useDispatch();

  const { userId } = useSelector(selectModalPayload);
  const user = useSelector(selectUserCurrentItem);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  useEffect(() => {
    dispatch(handleUserGet(userId));
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
          <Title>User details</Title>

          <Section>
            <MainInfo>
              <ImageWrapper>
                <Image src={getImageUrl(user.avatar)} alt="User avatar" />
              </ImageWrapper>
              <Text>
                <Name>{user.name}</Name>
                <Email>
                  <MailIcon />
                  {user.email}
                </Email>
              </Text>
            </MainInfo>
          </Section>

          <Section>
            <Item>
              <ItemLabel>Status:</ItemLabel>
              <ItemValue>
                {USER_STATUS_FILTERS[user.status]?.label || '-'}
              </ItemValue>
            </Item>
            <Item>
              <ItemLabel>Role:</ItemLabel>
              <ItemValue>
                {USER_ROLE_FILTERS[user.role]?.label || '-'}
              </ItemValue>
            </Item>
          </Section>

          <Section>
            <Item>
              <ItemLabel>Invited by:</ItemLabel>
              <ItemValue>{user.invitedBy?.name || '-'}</ItemValue>
            </Item>
            {user.createdAt && (
              <Item>
                <ItemLabel>Invited at:</ItemLabel>
                <ItemValue>{formatISO(user.createdAt, 'D HH:mm')}</ItemValue>
              </Item>
            )}
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

export default ViewUserModal;
