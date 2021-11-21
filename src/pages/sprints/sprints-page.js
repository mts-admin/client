import React from 'react';
import * as R from 'ramda';

import useSprintsPageContainer from './container';
import {
  Content,
  Tabs,
  Header,
  AddButton,
  CardsWrapper,
  EmptyMessage,
  Pagination,
  FiltersWrapper,
} from './styled-components';
import SprintCard from './components/sprint-card';
import { SimpleSelect } from '../../components/form-items';
import { LoaderWithBackground } from '../../components/loaders/fullscreen-loader';
import { SPRINT_SORT_VALUE, SPRINT_TAB } from '../../constants/sprints';
import { COMPONENT_STATE } from '../../constants/general';

const SprintsPage = () => {
  const {
    page,
    sort,
    status,
    params,
    sprints,
    isLgDown,
    pagesCount,
    componentState,
    handlePageChange,
    handleSortChange,
    handleStatusChange,
    handleStatusMobileChange,
    handleCreateButtonClick,
  } = useSprintsPageContainer();

  return (
    <Content>
      {!isLgDown && (
        <Tabs
          value={status}
          onChange={handleStatusChange}
          options={Object.values(SPRINT_TAB)}
        />
      )}

      <Header>
        <FiltersWrapper>
          {isLgDown && (
            <SimpleSelect
              value={status}
              onChange={handleStatusMobileChange}
              name="status"
              label="Status"
              data={Object.values(SPRINT_TAB).map((elem) => ({
                label: elem,
                value: elem,
              }))}
            />
          )}
          <SimpleSelect
            value={sort}
            onChange={handleSortChange}
            name="sort"
            label="Sort by"
            data={Object.values(SPRINT_SORT_VALUE)}
          />
        </FiltersWrapper>

        <AddButton onClick={handleCreateButtonClick}>+ Add</AddButton>
      </Header>

      <CardsWrapper>
        {sprints.map((sprint) => (
          <SprintCard key={sprint} id={sprint} params={params} />
        ))}

        {R.cond([
          [R.equals(COMPONENT_STATE.LOADING), () => <LoaderWithBackground />],
          [
            R.equals(COMPONENT_STATE.EMPTY),
            () => <EmptyMessage>Sprints not found...</EmptyMessage>,
          ],
          [R.equals(COMPONENT_STATE.ERROR), () => null],
        ])(componentState)}
      </CardsWrapper>

      <Pagination page={page} onChange={handlePageChange} count={pagesCount} />
    </Content>
  );
};

export default SprintsPage;
