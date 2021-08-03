import { toast } from 'react-toastify';

import history from '../history';
import { loginRequest, getMe } from '../../api/auth';
import {
  signInRequest,
  signInSuccess,
  signInError,
  getMeRequest,
  getMeSuccess,
  getMeError,
} from './actions';
import { getErrorMessage } from '../../utils/general';
import { setToken } from '../../utils/local-storage';
import { ROUTE } from '../../routes/constants';

export const handleLogin =
  ({ email, password }) =>
  (dispatch) =>
    Promise.resolve(dispatch(signInRequest()))
      .then(() => loginRequest({ email, password }))
      .then(({ data, token }) => {
        setToken(token);
        toast.success('You have successfully logged in!');
        dispatch(signInSuccess(data));
        history.push(ROUTE.SCHEDULES);
      })
      .catch((error) => {
        toast.error(getErrorMessage(error));
        dispatch(signInError());
      });

export const handleGetMe = () => (dispatch) =>
  Promise.resolve(dispatch(getMeRequest()))
    .then(() => getMe())
    .then(({ data }) => {
      dispatch(getMeSuccess(data));
    })
    .catch(() => {
      dispatch(getMeError());
    });
