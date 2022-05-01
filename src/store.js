import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import rootReducer from './reducers';
import TextingService from './services/api_service';

const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => (
    gDM({serializableCheck: false})
    .concat(TextingService.middleware)
  )
});
setupListeners(store.dispatch);

export default store;
