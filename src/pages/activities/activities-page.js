import React from 'react';
import { FormProvider } from 'react-hook-form';
import * as R from 'ramda';

import useActivitiesPageContainer from './container';
import {
  Tabs,
  Content,
  Header,
  Description,
  StyledTimer,
  RestCount,
  CardsWrapper,
  Pagination,
  EmptyMessage,
  RestCountLabel,
  RestCountValue,
} from './styled-components';
import ActivitiesFilters from './components/activities-filters';
import ActivityCard from './components/activity-card';
import { LoaderWithBackground } from '../../components/loaders/fullscreen-loader';
import { COMPONENT_STATE } from '../../constants/general';
import { ACTIVITY_STATUS, ACTIVITY_TABS } from '../../constants/activities';

const ActivitiesPage = () => {
  const {
    form,
    page,
    status,
    restCount,
    pagesCount,
    activities,
    componentState,
    onTimerExpire,
    handlePageChange,
    handleStatusChange,
    handleFiltersChange,
    expiryTimerTimestamp,
  } = useActivitiesPageContainer();

  return (
    <Content>
      <Tabs
        value={status}
        onChange={handleStatusChange}
        options={Object.values(ACTIVITY_TABS)}
      />

      {status === ACTIVITY_STATUS.ACTIVE.value && (
        <Header>
          <Description>
            Here you can see weekly activities which were assigned to you by
            some of the administrators
          </Description>
          <StyledTimer
            expiryTimestamp={expiryTimerTimestamp}
            onExpire={onTimerExpire}
            title="Time to new activity"
          />
          <RestCount>
            <RestCountValue>{restCount}</RestCountValue>
            <RestCountLabel>rest activities</RestCountLabel>
          </RestCount>
        </Header>
      )}

      <FormProvider {...form}>
        <ActivitiesFilters onSubmit={handleFiltersChange} />
      </FormProvider>

      <CardsWrapper>
        {activities.map((activity) => (
          <ActivityCard key={activity} id={activity} />
        ))}

        {R.cond([
          [R.equals(COMPONENT_STATE.LOADING), () => <LoaderWithBackground />],
          [
            R.equals(COMPONENT_STATE.EMPTY),
            () => (
              <EmptyMessage>
                Activities not found or you were not given any.
              </EmptyMessage>
            ),
          ],
          [R.equals(COMPONENT_STATE.ERROR), () => null],
        ])(componentState)}
      </CardsWrapper>

      <Pagination page={page} onChange={handlePageChange} count={pagesCount} />
    </Content>
  );
};

export default ActivitiesPage;
