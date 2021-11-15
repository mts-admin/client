import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { handleNoteGet, handleNoteUpdate } from '../../../store/notes/thunk';
import {
  selectCurrentNote,
  selectNotesError,
  selectNotesLoading,
} from '../../../store/notes/selectors';
import useEffectAfterMount from '../../../hooks/use-effect-after-mount';
import { getComponentState, getErrorMessage } from '../../../utils/general';

const useEditNotePageContainer = () => {
  const dispatch = useDispatch();

  const { goBack } = useHistory();

  const { id } = useParams();

  const { control, handleSubmit, reset } = useForm({
    title: '',
    content: '',
    tags: [],
  });

  const note = useSelector(selectCurrentNote);
  const loading = useSelector(selectNotesLoading);
  const error = useSelector(selectNotesError);

  useEffect(() => {
    dispatch(handleNoteGet(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectAfterMount(() => {
    reset({
      title: note.title || '',
      content: note.content || '',
      tags: note.tags || [],
    });
  }, [note]);

  const handleFormSubmit = handleSubmit((values) => {
    dispatch(handleNoteUpdate(id, values));
  });

  const handleCancelButtonClick = () => goBack();

  const componentState = useMemo(
    () => getComponentState(loading, error),
    [loading, error],
  );

  const errorMessage = error && getErrorMessage(error);

  return {
    control,
    loading,
    errorMessage,
    componentState,
    handleFormSubmit,
    handleCancelButtonClick,
  };
};

export default useEditNotePageContainer;
