import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import user from './user';
import APIService from '../services/api_service';
import messages from './messages';

const persistConfig = {
  key: 'root',
  storage: storage('Texting-Service-136464ca-6501-4f83-81a7-056713eccc28'),
  stateReconciler: hardSet,
  blacklist: [messages.reducerPath]
};

const rootReducer = combineReducers({
  [APIService.reducerPath]: APIService.reducer,
  user: user.reducer,
  messages: messages.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
