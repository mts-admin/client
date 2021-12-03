import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { handleLogin } from '../../../store/auth/thunk';
import { selectAuthLoading } from '../../../store/auth/selectors';

const useLoginPageContainer = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);

  const { control, handleSubmit } = useForm();

  const onSubmit = handleSubmit((values) => {
    dispatch(handleLogin(values));
  });

  return { control, onSubmit, loading };
};

export default useLoginPageContainer;
