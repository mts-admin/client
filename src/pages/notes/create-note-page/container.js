import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { handleNoteCreate } from '../../../store/notes/thunk';
import { selectNotesLoading } from '../../../store/notes/selectors';
import { ROUTE } from '../../../routes/constants';

const useCreateNotePageContainer = () => {
  const dispatch = useDispatch();

  const { push } = useHistory();

  const { control, handleSubmit } = useForm();

  const loading = useSelector(selectNotesLoading);

  const handleFormSubmit = handleSubmit((values) => {
    dispatch(handleNoteCreate(values));
  });

  const handleCancelButtonClick = () => push(ROUTE.NOTES);

  return {
    control,
    loading,
    handleFormSubmit,
    handleCancelButtonClick,
  };
};

export default useCreateNotePageContainer;
