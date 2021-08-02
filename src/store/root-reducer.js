import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './history';
import authReducer from './auth/reducer';

const reducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
});

export default reducer;
