import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = [];

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    receivedMessages: (state, action) => {
      return action.payload;
    },
    messageCreated: (state, action) => {
      return [action.payload, ...state];
    },
    messageUpdated: (state, action) => {
      const updatedMessage = action.payload;
      const messages = _.reject(state, {id: updatedMessage.id});

      return [...messages, updatedMessage];
    },
    APP_RESET: () => {
      return initialState;
    }
  },
});

export const {receivedMessages, messageCreated, messageUpdated, APP_RESET} = messages.actions;
export default messages;
