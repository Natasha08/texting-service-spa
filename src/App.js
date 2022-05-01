import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/roboto';

import Home from './components/Home.js';
import './App.css';

export default function App({initialEntries = ['/'], providedStore=store, Router=BrowserRouter}={}) {
  return (
    <Provider store={providedStore}>
      <Router initialEntries={initialEntries}>
        <Home />
      </Router>
    </Provider>
  );
}
