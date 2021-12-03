import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as R from 'ramda';

import useVisitsPageContainer from './container';
import {
  Content,
  Header,
  Title,
  AddVisitButton,
  LinearLoader,
} from './styled-components';
import SimpleMessage from '../../components/simple-message';
import { LoaderWithBackground } from '../../components/loaders/fullscreen-loader';
import { COMPONENT_STATE } from '../../constants/general';

const VisitsPage = () => {
  const {
    visits,
    schedule,
    visitsLoading,
    componentState,
    errorMessage,
    visitsPermissions,
    selectAllow,
    eventClick,
    eventContent,
    slotLabelFormat,
    eventChange,
    handleDateSelect,
    handleDateRangeChange,
    handleAddVisitButtonClick,
  } = useVisitsPageContainer();

  return (
    <Content>
      {R.cond([
        [R.equals(COMPONENT_STATE.LOADING), () => <LoaderWithBackground />],
        [
          R.equals(COMPONENT_STATE.ERROR),
          () => <SimpleMessage title={errorMessage} error />,
        ],
        [
          R.equals(COMPONENT_STATE.SUCCESS),
          () => (
            <>
              {visitsLoading && <LinearLoader />}

              <Header>
                <Title>{schedule.name}</Title>

                {visitsPermissions.creatable && (
                  <AddVisitButton
                    size="small"
                    onClick={handleAddVisitButtonClick}
                  >
                    + Add visit
                  </AddVisitButton>
                )}
              </Header>

              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,today,next',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                eventTimeFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  meridiem: false,
                  hour12: false,
                }}
                initialView="dayGridMonth"
                height="100%"
                events={visits}
                editable={visitsPermissions.editable}
                selectable={visitsPermissions.creatable}
                selectMirror
                dayMaxEvents
                weekends
                firstDay={1}
                allDaySlot={false}
                eventDurationEditable={false}
                slotLabelFormat={slotLabelFormat}
                selectAllow={selectAllow}
                datesSet={handleDateRangeChange}
                select={handleDateSelect}
                eventClick={eventClick}
                eventChange={eventChange}
                eventContent={eventContent}
              />
            </>
          ),
        ],
      ])(componentState)}
    </Content>
  );
};

export default VisitsPage;
