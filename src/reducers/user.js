import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      return action.payload;
    },
    signedUp: (state, action) => {
      return action.payload;
    },
    logout: (state, action) => {
      return initialState;
    }
  },
});

export const {loggedIn, signedUp, logout} = user.actions;
export default user;
