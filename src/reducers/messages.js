import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = [];

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    receivedMessages: (state, action) => {
      return _.orderBy(action.payload, 'created_at', 'desc');
    },
    messageCreated: (state, action) => {
      return _.orderBy([action.payload, ...state], 'created_at', 'desc');
    },
    APP_RESET: () => {
      return initialState;
    }
  },
});

export const {receivedMessages, messageCreated, APP_RESET} = messages.actions;
export default messages;
