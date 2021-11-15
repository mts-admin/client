import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import * as R from 'ramda';

import useViewNotePageContainer from './container';
import {
  Content,
  Title,
  Header,
  Buttons,
  TagsWrapper,
  TagItem,
  ButtonBack,
} from './styled-components';
import { QuillResult } from '../../../components/quill-editor';
import SimpleMessage from '../../../components/simple-message';
import { COMPONENT_STATE } from '../../../constants/general';

const ViewNotePage = () => {
  const {
    note,
    errorMessage,
    componentState,
    handleBackButtonClick,
    handleEditButtonClick,
    handleDeleteButtonClick,
  } = useViewNotePageContainer();

  return (
    <Content>
      {R.cond([
        [R.equals(COMPONENT_STATE.LOADING), () => <CircularProgress />],
        [
          R.equals(COMPONENT_STATE.ERROR),
          () => <SimpleMessage title={errorMessage} error />,
        ],
        [
          R.equals(COMPONENT_STATE.SUCCESS),
          () => (
            <>
              <ButtonBack onClick={handleBackButtonClick}>Back</ButtonBack>

              <Header>
                <Title>{note.title}</Title>
                <Buttons>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleEditButtonClick}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteButtonClick}
                  >
                    Delete
                  </Button>
                </Buttons>
              </Header>

              <QuillResult value={note.content} />

              {note.tags?.length > 0 && (
                <TagsWrapper>
                  {note.tags?.map((tag, i) => (
                    <TagItem key={`${tag}-${i + 1}`}>{`#${tag.replace(
                      ' ',
                      '-',
                    )}`}</TagItem>
                  ))}
                </TagsWrapper>
              )}
            </>
          ),
        ],
      ])(componentState)}
    </Content>
  );
};

export default ViewNotePage;
