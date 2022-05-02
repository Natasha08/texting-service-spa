import _ from 'lodash';

import { requiredKeysPresent, respondWith } from './helpers/server';

const API_VERSION = '/api/v1';

const APIService = (request, responses={}) => {
  const {signup={}, login={}, getMessages={}, createMessage} = responses;

  if (!request.url.includes(API_VERSION)) return Promise.reject(`Unknown API version, ${request.url}`);;

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

  if (request.url.endsWith('/text_messages')) {
    if (request.method === 'GET') {
      if (requiredKeysPresent({request, name: 'getMessages', requiredKeys: []})) {
        return respondWith(getMessages);
      }
    }
    if (request.method === 'POST') {
      if (requiredKeysPresent({request, name: 'createMessage', requiredKeys: ['to_number', 'text']})) {
        return respondWith(createMessage);
      }
    }
  }

};

export default APIService;
