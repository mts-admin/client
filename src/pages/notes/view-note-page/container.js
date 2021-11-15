import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import { handleNoteGet } from '../../../store/notes/thunk';
import {
  selectCurrentNote,
  selectNotesError,
  selectNotesLoading,
} from '../../../store/notes/selectors';
import { openModal } from '../../../modals/modal-reducer';
import { getComponentState, getErrorMessage } from '../../../utils/general';
import { DYNAMIC_ROUTE, ROUTE } from '../../../routes/constants';
import { MODAL_NAME } from '../../../modals/constants';

const useViewNotePageContainer = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { push } = useHistory();

  const note = useSelector(selectCurrentNote);
  const loading = useSelector(selectNotesLoading);
  const error = useSelector(selectNotesError);

  useEffect(() => {
    dispatch(handleNoteGet(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const componentState = useMemo(
    () => getComponentState(loading, error),
    [loading, error],
  );

  const handleEditButtonClick = () => push(DYNAMIC_ROUTE.EDIT_NOTE(id));
  const handleDeleteButtonClick = () =>
    dispatch(
      openModal({
        name: MODAL_NAME.DELETE_NOTE,
        payload: { id },
      }),
    );
  const handleBackButtonClick = () => push(ROUTE.NOTES);

  const errorMessage = error && getErrorMessage(error);

  return {
    note,
    errorMessage,
    componentState,
    handleBackButtonClick,
    handleEditButtonClick,
    handleDeleteButtonClick,
  };
};

export default useViewNotePageContainer;
