import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as R from 'ramda';

import {
  handleRegisterByInvite,
  handleGetInvitationData,
} from '../../../store/auth/thunk';
import {
  selectInvitationLoading,
  selectAuthLoading,
  selectAuthUser,
} from '../../../store/auth/selectors';

const useRegisterPageContainer = () => {
  const { token } = useParams();

  const dispatch = useDispatch();
  const invitationLoading = useSelector(selectInvitationLoading);
  const formLoading = useSelector(selectAuthLoading);
  const user = useSelector(selectAuthUser);

  const { reset, control, handleSubmit } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  useEffect(() => {
    dispatch(handleGetInvitationData(token));
  }, [dispatch, token]); // should be [] because of warning

  useEffect(() => {
    if (user) {
      reset({
        ...R.pick(['name', 'email'], user),
        password: '',
        passwordConfirm: '',
      });
    }
  }, [user, reset]); // should be [user] because of warning

  const onSubmit = handleSubmit((values) => {
    const data = {
      ...R.pick(['password', 'passwordConfirm'], values),
      token,
    };
    dispatch(handleRegisterByInvite(data));
  });

  return { control, onSubmit, user, invitationLoading, formLoading };
};

export default useRegisterPageContainer;
