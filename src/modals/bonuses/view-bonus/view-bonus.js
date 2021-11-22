import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import * as R from 'ramda';

import {
  Text,
  Title,
  Image,
  Content,
  TextBold,
  Description,
  ImageWrapper,
  ErrorMessage,
  AdditionalInfo,
} from './styled-components';
import {
  selectBonusCurrentItem,
  selectBonusesError,
  selectBonusesLoading,
} from '../../../store/bonuses/selectors';
import { handleMyBonusGet } from '../../../store/bonuses/thunk';
import { selectModalPayload } from '../../modal-reducer';
import {
  getComponentState,
  getErrorMessage,
  getImageUrl,
} from '../../../utils/general';
import { formatISO } from '../../../utils/date';
import { COMPONENT_STATE } from '../../../constants/general';

const ViewBonusModal = () => {
  const dispatch = useDispatch();

  const { id } = useSelector(selectModalPayload);
  const bonus = useSelector(selectBonusCurrentItem);
  const loading = useSelector(selectBonusesLoading);
  const error = useSelector(selectBonusesError);

  useEffect(() => {
    dispatch(handleMyBonusGet(id));
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
          <ImageWrapper>
            <Image src={getImageUrl(bonus.image, 'bonus')} />
          </ImageWrapper>

          <Title>{bonus.title}</Title>

          <Description
            lines={5}
            more="Show more"
            less="Show less"
            truncatedEndingComponent="... "
          >
            {bonus.description}
          </Description>

          <AdditionalInfo>
            <Text>
              Gifted by:<TextBold>{bonus.createdBy?.name}</TextBold>
            </Text>
            <Text>{formatISO(bonus.createdAt, 'D HH:mm')}</Text>
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

export default ViewBonusModal;
