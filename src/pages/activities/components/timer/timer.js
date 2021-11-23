import React from 'react';
import { instanceOf, func, string, oneOfType, number } from 'prop-types';
import { useTimer } from 'react-timer-hook';

import {
  Content,
  Title,
  TimeWrapper,
  TimeItem,
  TimeValue,
  TimeLabel,
  Divider,
} from './styled-components';
import useEffectAfterMount from '../../../../hooks/use-effect-after-mount';

const Timer = ({ expiryTimestamp, onExpire, title, ...rest }) => {
  const { seconds, minutes, hours, days, restart } = useTimer({
    expiryTimestamp,
    onExpire,
    autoStart: !!expiryTimestamp,
  });

  useEffectAfterMount(() => {
    restart(expiryTimestamp);
  }, [expiryTimestamp]);

  const daysValue = String(days).padStart(2, '0');
  const hoursValue = String(hours).padStart(2, '0');
  const minutesValue = String(minutes).padStart(2, '0');
  const secondsValue = String(seconds).padStart(2, '0');

  return (
    <Content {...rest}>
      <Title>{title}</Title>

      <TimeWrapper>
        <TimeItem>
          <TimeValue>{daysValue}</TimeValue>
          <TimeLabel>days</TimeLabel>
        </TimeItem>

        <Divider>:</Divider>

        <TimeItem>
          <TimeValue>{hoursValue}</TimeValue>
          <TimeLabel>hours</TimeLabel>
        </TimeItem>

        <Divider>:</Divider>

        <TimeItem>
          <TimeValue>{minutesValue}</TimeValue>
          <TimeLabel>mins</TimeLabel>
        </TimeItem>

        <Divider>:</Divider>

        <TimeItem>
          <TimeValue>{secondsValue}</TimeValue>
          <TimeLabel>secs</TimeLabel>
        </TimeItem>
      </TimeWrapper>
    </Content>
  );
};

Timer.propTypes = {
  expiryTimestamp: oneOfType([instanceOf(Date), number]),
  onExpire: func.isRequired,
  title: string.isRequired,
};

export default React.memo(Timer);
