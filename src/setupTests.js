import '@testing-library/jest-dom/extend-expect';
import _ from 'lodash';
import fetchMock from 'jest-fetch-mock';
import { render } from '@testing-library/react';

import * as globalHelpers from './__tests__/global_helpers';
import App from './App';

global._ = global._ || _;

_.assign(global, globalHelpers);

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
