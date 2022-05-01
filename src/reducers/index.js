import { combineReducers } from 'redux';
import user from './user';
import APIService from '../services/api_service';

const rootReducer = combineReducers({
  [APIService.reducerPath]: APIService.reducer,
  user: user.reducer,
});

export default rootReducer;
