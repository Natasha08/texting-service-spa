import _ from 'lodash';

import { requiredKeysPresent, respondWith } from './helpers/server';

const APIService = (request, responses={}) => {
  const {signup={}, login={}} = responses;

  if (!request.url.includes('/api/v1')) return Promise.reject(`Unknown API version, ${request.url}`);;

  if (request.url.endsWith('/signup')) {
    if (requiredKeysPresent({request, name: 'signup', requiredKeys: ['user']})) {
      return respondWith(signup);
    }
  }

  if (request.url.endsWith('/login')) {
    if (requiredKeysPresent({request, name: 'login', requiredKeys: ['email', 'password']})) {
      return respondWith(login);
    }
  }
};

export default APIService;
