import React from 'react';
import * as R from 'ramda';

import useSchedulesPageContainer from './container';
import {
  Tabs,
  Pagination,
  CreateButton,
  HeaderContent,
  ContentWrapper,
  SchedulesPageContent,
} from './styled-components';
import SimpleMessage from '../../components/simple-message';
import { ScheduleCard } from './components';
import { LoaderWithBackground } from '../../components/loaders/fullscreen-loader';
import { SCHEDULE_TYPE } from '../../constants/schedules';
import { COMPONENT_STATE } from '../../constants/general';

const SchedulesPage = () => {
  const {
    page,
    pagesCount,
    schedules,
    scheduleType,
    componentState,
    emptyMessage,
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
          <CreateButton variant="contained" onClick={onCreateButtonClick}>
            + Create
          </CreateButton>
        )}
      </HeaderContent>

      <ContentWrapper>
        {schedules.map((id) => (
          <ScheduleCard key={id} id={id} page={page} type={scheduleType} />
        ))}
      </ContentWrapper>

      {R.cond([
        [R.equals(COMPONENT_STATE.LOADING), () => <LoaderWithBackground />],
        [
          R.equals(COMPONENT_STATE.EMPTY),
          () => <SimpleMessage {...emptyMessage} />,
        ],
        [R.equals(COMPONENT_STATE.ERROR), () => null],
      ])(componentState)}

      <Pagination page={page} onChange={onPageChange} count={pagesCount} />
    </SchedulesPageContent>
  );
};
export default React.memo(SchedulesPage);
