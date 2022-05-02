import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import '@fontsource/roboto';

import Home from './components/Home.js';
import './App.scss';

const persistor = persistStore(store);

export default function App({initialEntries = ['/'], providedStore=store, Router=BrowserRouter}={}) {
  return (
    <Provider store={providedStore}>
      <PersistGate loading={null} persistor={persistor}>
        <Router initialEntries={initialEntries}>
          <Home />
        </Router>
      </PersistGate>
    </Provider>
  );
}
