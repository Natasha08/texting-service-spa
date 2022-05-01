import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import _ from 'lodash';

const defaultQuery = ({url, method, params}) => (body) => ({
  url,
  method,
  ..._.isFunction(params) ? params(body) : {body},
});

const defaultOnQueryStarted = ({onSuccess, onFailure}) => async (id, {dispatch, queryFulfilled}) => {
  try {
    const {data} = await queryFulfilled;
    _.isFunction(onSuccess) && dispatch(onSuccess(data));
  } catch (error) {
    _.isFunction(onFailure) && dispatch(onFailure(error));
  }
};

const defaultExtraReducers = (builder) => {
  builder.addCase('APP_RESET', () => {
    return this.initialState;
  });
};

const build = ({
  query=defaultQuery,
  onQueryStarted=defaultOnQueryStarted,
  extraReducers=defaultExtraReducers,
  ...config
}) => ({
  query: query(config),
  onQueryStarted: onQueryStarted(config),
  extraReducers,
});

const createApiService = ({
  reducerPath,
  initialState=null,
  baseOptions,
  tagTypes=[],
  endpoints
}) => createApi({
  reducerPath,
  baseQuery: fetchBaseQuery(baseOptions),
  initialState,
  tagTypes,
  endpoints: (builder) => (
    _.mapValues(endpoints, (endpoint) => (
      builder.mutation(build(endpoint))
    ))
  )
});

export default createApiService;
