import '@testing-library/jest-dom/extend-expect';
import _ from 'lodash';
import fetchMock from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import * as globalHelpers from './__tests__/global_helpers';
import * as mocks from './__mocks__';

import App from './App';
import rootReducer from './reducers';
import APIService from './services/api_service';

global._ = global._ || _;

_.assign(global, globalHelpers);
_.assign(global, mocks);

global.withStore = (preloadedState={}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (gDM) => (
      gDM({serializableCheck: false})
        .concat(APIService.middleware)
    )
  });
  setupListeners(store.dispatch);
  return store;
};

beforeAll(() => {
  fetchMock.enableMocks();
});

afterAll(() => {
  fetchMock.disableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

global.mountApp = () => render(<App />);

global.mountApp = (state={}, initialEntries=['/']) => (
  render(<App providedStore={withStore(state)} initialEntries={initialEntries} Router={MemoryRouter} />)
);
