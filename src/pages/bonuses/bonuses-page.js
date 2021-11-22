import React from 'react';
import * as R from 'ramda';

import useBonusesPageContainer from './container';
import {
  Content,
  CardsWrapper,
  EmptyMessage,
  Pagination,
} from './styled-components';
import BonusCard from './components/bonus-card';
import BonusesFilters from './components/bonuses-filters';
import { LoaderWithBackground } from '../../components/loaders/fullscreen-loader';
import { COMPONENT_STATE } from '../../constants/general';

const BonusesPage = () => {
  const {
    page,
    bonuses,
    pagesCount,
    componentState,
    filtersDefaultState,
    handleFiltersChange,
    handlePageChange,
  } = useBonusesPageContainer();

  return (
    <Content>
      <BonusesFilters
        defaultValues={filtersDefaultState}
        onSubmit={handleFiltersChange}
      />

      <CardsWrapper>
        {bonuses.map((bonus) => (
          <BonusCard key={bonus} id={bonus} />
        ))}

        {R.cond([
          [R.equals(COMPONENT_STATE.LOADING), () => <LoaderWithBackground />],
          [
            R.equals(COMPONENT_STATE.EMPTY),
            () => (
              <EmptyMessage>
                Bonuses not found or you were not given any.
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

export default BonusesPage;
