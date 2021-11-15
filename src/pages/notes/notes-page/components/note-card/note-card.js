import React, { useCallback, useMemo, useState } from 'react';
import { object, string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import TextTruncate from 'react-text-truncate';
import Rating from '@mui/material/Rating';

import history from '../../../../../store/history';
import SimpleCard from '../../../../../components/cards/simple-card';
import { handleNoteEdit } from '../../../../../store/notes/thunk';
import { selectNote } from '../../../../../store/notes/selectors';
import {
  Description,
  TagsWrapper,
  TagItem,
  Footer,
  Wrapper,
  CreatedAt,
  StartButtonWrapper,
} from './styled-components';
import { openModal } from '../../../../../modals/modal-reducer';
import { DYNAMIC_ROUTE } from '../../../../../routes/constants';
import { MODAL_NAME } from '../../../../../modals/constants';
import { removeHTMLTagsFromString } from '../../../../../utils/general';
import { formatISO } from '../../../../../utils/date';
import useEffectAfterMount from '../../../../../hooks/use-effect-after-mount';

const getMenuOptions = (id, params, handleModalOpen) => [
  {
    label: 'View more',
    onClick: () => history.push(DYNAMIC_ROUTE.NOTE(id)),
  },
  {
    label: 'Edit',
    onClick: () => history.push(DYNAMIC_ROUTE.EDIT_NOTE(id)),
  },
  {
    label: 'Delete',
    onClick: () =>
      handleModalOpen({
        name: MODAL_NAME.DELETE_NOTE,
        payload: { id, params },
      }),
  },
];

const NoteCard = ({ id, params }) => {
  const dispatch = useDispatch();

  const note = useSelector((state) => selectNote(state, id));

  const [favorite, setFavorite] = useState(note.favorite ? 1 : null);

  useEffectAfterMount(() => {
    const body = { favorite: !!favorite };

    dispatch(handleNoteEdit(id, body));
  }, [favorite]);

  const handleModalOpen = useCallback(
    (payload) => dispatch(openModal(payload)),
    [dispatch],
  );

  const menuOptions = useMemo(
    () => getMenuOptions(id, params, handleModalOpen),
    [id, params, handleModalOpen],
  );

  const handleFavoriteChange = (event, newValue) => {
    setFavorite(newValue);
  };

  const content = removeHTMLTagsFromString(note.content, ' ');
  const hasTags = note?.tags?.length > 0;

  return (
    <SimpleCard
      key={id}
      menuOptions={menuOptions}
      title={note.title}
      link={DYNAMIC_ROUTE.NOTE(id)}
    >
      <TextTruncate line={3} element={Description} text={content} />

      <Footer>
        {hasTags && (
          <TagsWrapper>
            {note.tags.map((tag, i) => (
              <TagItem key={`${tag}-${i + 1}`}>{`#${tag.replace(
                ' ',
                '-',
              )}`}</TagItem>
            ))}
          </TagsWrapper>
        )}

        <Wrapper>
          <CreatedAt>{formatISO(note.createdAt, 'D HH:mm')}</CreatedAt>
          <StartButtonWrapper>
            <Rating value={favorite} onChange={handleFavoriteChange} max={1} />
          </StartButtonWrapper>
        </Wrapper>
      </Footer>
    </SimpleCard>
  );
};

NoteCard.propTypes = {
  id: string.isRequired,
  params: object.isRequired,
};

export default React.memo(NoteCard);
