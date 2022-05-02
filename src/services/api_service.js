import createApiService from './helpers/create_api_service';
import { loggedIn, signedUp } from '../reducers/user';
import { receivedMessages, messageCreated } from '../reducers/messages';
import _ from 'lodash';

export const API_VERSION = '/api/v1' ;
const SIGNUP_PATH = '/auth/signup'
const LOGIN_PATH = '/auth/login'

const reducerPath = 'APIService';
const baseUrl = process.env.REACT_APP_API_HOST + API_VERSION;
const tagTypes = ['base-api'];

const endpoints = {
  signup: {
    url: SIGNUP_PATH,
    method: 'POST',
    onSuccess: signedUp
  },
  login: {
    url: LOGIN_PATH,
    method: 'POST',
    onSuccess: loggedIn
  },
  getMessages: {
    url: '/text_messages',
    method: 'GET',
    onSuccess: receivedMessages
  },
  createMessage: {
    url: '/text_messages',
    method: 'POST',
    onSuccess: messageCreated
  }
};

const headers = (headers, store) => {
  const token = store.getState().user?.token ?? '';

  headers.set('Authorization', `Bearer ${token}`);

  return headers;
};
const baseOptions = {baseUrl, prepareHeaders: headers};

const APIService = createApiService({
  reducerPath,
  baseOptions,
  tagTypes,
  endpoints
});

export const {
  useSignupMutation, useLoginMutation, useGetMessagesMutation, useCreateMessageMutation
} = APIService;
export default APIService;
