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

// eventClick - triggers by clicking on event item // open modal with detailed info about the visit (edit/delete)
// eventChange - trigger by dropping/moving event (month/week/day view) // change time/date and make request (edit)

// REMINDER: view visit modal: edit, complete, cancel, delete

// TODO: make calendar responsive
const VisitsPage = () => {
  const {
    visits,
    schedule,
    visitsLoading,
    componentState,
    errorMessage,
    visitsPermissions,
    selectAllow,
    eventContent,
    slotLabelFormat,
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
                // eventClick={this.handleEventClick}
                // eventChange={(data) => console.log(data.event.toPlainObject())}
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
