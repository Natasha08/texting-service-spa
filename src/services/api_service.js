import createApiService from './helpers/create_api_service';
import { loggedIn, signedUp } from '../reducers/user';

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
  }
};

const baseOptions = {baseUrl};

const APIService = createApiService({
  reducerPath,
  baseOptions,
  tagTypes,
  endpoints
});

export const {useSignupMutation, useLoginMutation} = APIService;
export default APIService;
