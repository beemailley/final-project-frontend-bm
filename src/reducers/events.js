import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eventId: null,
  eventName: null,
  eventDateAndTime: null,
  eventVenue: null,
  eventAddress: null,
  eventCategory: null,
  eventSummary: null,
  // eventAttendees: null,
  createdBy: null
}

export const events = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEventId: (store, action) => {
      store.eventId = action.payload
    },
    setEventName: (store, action) => {
      store.eventName = action.payload
    },
    setEventDateAndTime: (store, action) => {
      store.eventDateAndTime = action.payload
    },
    setEventVenue: (store, action) => {
      store.eventVenue = action.payload
    },
    setEventAddress: (store, action) => {
      store.eventAddress = action.payload
    },
    setEventCategory: (store, action) => {
      store.eventCategory = action.payload
    },
    setEventSummary: (store, action) => {
      store.eventSummary = action.payload
    },
    // setEventAttendees: (store, action) => {
    //   store.eventAttendees = action.payload
    // },
    setCreatedBy: (store, action) => {
      store.createdBy = action.payload
    }
  }
})
