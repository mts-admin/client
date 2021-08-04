import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { handleResetPassword } from '../../../store/auth/thunk';
import { selectAuthLoading } from '../../../store/auth/selectors';

const useLoginPageContainer = () => {
  const { token } = useParams();

  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);

  const { control, handleSubmit } = useForm();

  const onSubmit = handleSubmit((values) => {
    dispatch(handleResetPassword({ ...values, token }));
  });

  return { control, onSubmit, loading };
};

export default useLoginPageContainer;
