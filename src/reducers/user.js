import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    username: null,
    userId: null,
    accessToken: null,
    error: null,
    user: null // changed from profile
  },
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
    setUser: (store, action) => {
      store.user = action.payload // changed from setProfile; store.profile
    }
  }

});