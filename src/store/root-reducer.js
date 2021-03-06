import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './history';
import { modalReducer } from '../modals/modal-reducer';
import authReducer from './auth/reducer';
import usersReducer from './users/reducer';
import schedulesReducer from './schedules/reducer';
import visitsReducer from './visits/reducer';
import financesReducer from './finances/reducer';
import notesReducer from './notes/reducer';
import sprintsReducer from './sprints/reducer';
import tasksReducer from './tasks/reducer';
import bonusesReducer from './bonuses/reducer';
import activitiesReducer from './activities/reducer';

const reducer = combineReducers({
  router: connectRouter(history),
  modals: modalReducer,
  auth: authReducer,
  users: usersReducer,
  schedules: schedulesReducer,
  visits: visitsReducer,
  finances: financesReducer,
  notes: notesReducer,
  sprints: sprintsReducer,
  tasks: tasksReducer,
  bonuses: bonusesReducer,
  activities: activitiesReducer,
});

export default reducer;
