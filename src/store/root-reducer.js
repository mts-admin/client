import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './history';
import { modalReducer } from '../modals/modal-reducer';
import authReducer from './auth/reducer';
import schedulesReducer from './schedules/reducer';
import visitsReducer from './visits/reducer';

const reducer = combineReducers({
  router: connectRouter(history),
  modals: modalReducer,
  auth: authReducer,
  schedules: schedulesReducer,
  visits: visitsReducer,
});

export default reducer;
