import React from 'react';
import Button from '@material-ui/core/Button';

import useSchedulesPageContainer from './container';
import {
  Tabs,
  Pagination,
  HeaderContent,
  ContentWrapper,
  SchedulesPageContent,
} from './styled-components';
import { ScheduleCard } from '../../components/cards';
import { LoaderWithBackground } from '../../components/loaders/fullscreen-loader';
import { SCHEDULE_TYPE } from '../../constants/schedules';

const SchedulesPage = () => {
  const {
    loading,
    page,
    pagesCount,
    schedules,
    scheduleType,
    onTypeChange,
    onPageChange,
    onCreateButtonClick,
  } = useSchedulesPageContainer();

  return (
    <SchedulesPageContent>
      <HeaderContent>
        <Tabs
          value={scheduleType}
          onChange={onTypeChange}
          options={Object.values(SCHEDULE_TYPE)}
          aria-label="schedule types"
        />
        {scheduleType === SCHEDULE_TYPE.MY && (
          <Button variant="contained" onClick={onCreateButtonClick}>
            + Create
          </Button>
        )}
      </HeaderContent>

      <ContentWrapper>
        {loading && <LoaderWithBackground />}
        {/* TODO: add empty content */}
        {/* TODO: clear store after unmount */}
        {schedules.map((id) => (
          <ScheduleCard key={id} id={id} page={page} type={scheduleType} />
        ))}
      </ContentWrapper>

      <Pagination page={page} onChange={onPageChange} count={pagesCount} />
    </SchedulesPageContent>
  );
};
export default React.memo(SchedulesPage);
