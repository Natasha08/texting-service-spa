import fetchMock from 'jest-fetch-mock';
import APIService from './api_service';

export const mockServers = (responses = {}) => {
  beforeEach(() => {
    fetchMock.mockResponse((request) => {
      if (request.url.startsWith(process.env.REACT_APP_API_HOST)) {
        return APIService(request, responses);
      }
    });
  });
};
