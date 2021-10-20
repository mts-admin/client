import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './history';
import { modalReducer } from '../modals/modal-reducer';
import authReducer from './auth/reducer';
import schedulesReducer from './schedules/reducer';

const reducer = combineReducers({
  router: connectRouter(history),
  modals: modalReducer,
  auth: authReducer,
  schedules: schedulesReducer,
});

export default reducer;
