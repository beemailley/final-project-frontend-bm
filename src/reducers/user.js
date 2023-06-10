import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    currentUserUsername: null,
    username: null,
    email: null,
    userId: null,
    accessToken: null,
    error: null,
    items: [], // profile items
    profileItems: null
  },
  reducers: {
    setCurrentUserUsername: (store, action) => {
      store.currentUserUsername = action.payload
    },
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setEmail: (store, action) => {
      store.email = action.payload
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
    setItems: (store, action) => {
      store.items = action.payload // profile items
    },
    setProfileItems: (store, action) => {
      store.profileItems = action.payload
    }
  }

});