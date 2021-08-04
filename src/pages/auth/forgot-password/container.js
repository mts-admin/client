import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { handleForgotPassword } from '../../../store/auth/thunk';
import { selectAuthLoading } from '../../../store/auth/selectors';

const useForgotPasswordPageContainer = () => {
  const [emailSentTo, setEmailSentTo] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);

  const { control, handleSubmit } = useForm();

  const onSubmit = handleSubmit(({ email }) => {
    const successCallback = () => setEmailSentTo(email);

    dispatch(handleForgotPassword(email, successCallback));
  });

  return { onSubmit, control, loading, emailSentTo };
};

export default useForgotPasswordPageContainer;
