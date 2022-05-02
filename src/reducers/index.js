import { combineReducers } from 'redux';
import user from './user';
import APIService from '../services/api_service';
import messages from './messages';

const rootReducer = combineReducers({
  [APIService.reducerPath]: APIService.reducer,
  user: user.reducer,
  messages: messages.reducer
});

export default rootReducer;
