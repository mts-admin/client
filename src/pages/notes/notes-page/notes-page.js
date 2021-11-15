import React from 'react';
import * as R from 'ramda';

import useNotesPageContainer from './container';
import {
  Header,
  Content,
  CardsWrapper,
  EmptyMessage,
  AddButton,
  Pagination,
} from './styled-components';
import { NotesFilters } from './components/notes-filters/notes-filters';
import { LoaderWithBackground } from '../../../components/loaders/fullscreen-loader';
import { COMPONENT_STATE } from '../../../constants/general';
import NoteCard from './components/note-card';

const NotesPage = () => {
  const {
    page,
    notes,
    params,
    pagesCount,
    componentState,
    filtersDefaultState,
    handlePageChange,
    handleFiltersChange,
    onCreateButtonClick,
  } = useNotesPageContainer();

  return (
    <Content>
      <Header>
        <NotesFilters
          onSubmit={handleFiltersChange}
          defaultValues={filtersDefaultState}
        />

        <AddButton onClick={onCreateButtonClick}>+ Add</AddButton>
      </Header>

      <CardsWrapper>
        {notes.map((note) => (
          <NoteCard key={note} id={note} params={params} />
        ))}

        {R.cond([
          [R.equals(COMPONENT_STATE.LOADING), () => <LoaderWithBackground />],
          [
            R.equals(COMPONENT_STATE.EMPTY),
            () => (
              <EmptyMessage>
                Notes not found or you haven&#39;t created any yet...
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

export default NotesPage;
