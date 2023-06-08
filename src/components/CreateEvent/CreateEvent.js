/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom';
import { events } from 'reducers/events';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';

export const CreateEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const { eventId } = useParams()
  const accessToken = useSelector((store) => store.user.accessToken)
  const event = useSelector((store) => store.events)
  const [isEditing, setIsEditing] = useState(true)
  const [newEvent, setNewEvent] = useState({
    eventName: '',
    // eventDateAndTime: new Date(),
    eventVenue: '',
    eventAddress: '',
    eventCategory: '',
    eventSummary: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log('e.target:', e.target)
    setNewEvent((prevState) => {
    //   console.log('prevState:', prevState)
      // eslint-disable-next-line prefer-object-spread
      const updatedState = Object.assign({}, prevState);
      //   console.log('updated state before [name]:', updatedState)
      updatedState[name] = value;
      //   console.log('updated state after [name]:', updatedState)
      return updatedState;
    });
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    // console.log('event submitted')
    // console.log(newEvent)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify(newEvent)
    }
    fetch(API_URL('events/'), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.response)
        dispatch(events.actions.setEventId(data.response._id))
        dispatch(events.actions.setEventName(data.response.eventName))
        dispatch(events.actions.setEventDateAndTime(data.response.eventDateAndTime))
        dispatch(events.actions.setEventVenue(data.response.eventVenue))
        dispatch(events.actions.setEventAddress(data.response.eventAddress))
        dispatch(events.actions.setEventCategory(data.response.eventCategory))
        dispatch(events.actions.setEventSummary(data.response.eventSummary))
        // eslint-disable-next-line no-underscore-dangle
        // navigate(`/events/${data.response._id}`)
      })
      .finally(() => setIsEditing(false))
  }

  const onViewEventButtonClick = (eventId) => {
    navigate(`/events/${eventId}`)
  }

  return (
    <>
      {isEditing && (
        <>
          <p>Is Editing</p>
          <form onSubmit={onFormSubmit}>
            <label htmlFor="eventName">
              Event Name:
              <input
                type="text"
                name="eventName"
                onChange={handleInputChange} />
            </label>
            {/* <label htmlFor="eventdateandtime">
              Event Date and Time:
              <input
                type="date"
                name="eventdateandtime"
                value={updatedEvent.eventDateAndTime}
                onChange={(e) => setUpdatedEvent({ eventDateAndTime: e.target.value })} />
            </label> */}
            <label htmlFor="eventVenue">
              Event Venue:
              <input
                type="text"
                name="eventVenue"
                onChange={handleInputChange} />
            </label>
            <label htmlFor="eventAddress">
              Event Address:
              <input
                type="text"
                name="eventAddress"
                onChange={handleInputChange} />
            </label>
            <label htmlFor="eventCategory">
              Type of Event:
              <select name="eventCategory" onChange={handleInputChange}>
                <option value="">Please select one:</option>
                <option value="Category One">Category One</option>
                <option value="Category Two">Category 2</option>
                <option value="Category Three">Category 3</option>
                <option value="Category Four">Category 4</option>
              </select>
            </label>
            <label htmlFor="eventSummary">
              Event Summary:
              <input
                type="text"
                name="eventSummary"
                onChange={handleInputChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      {!isEditing && (
        <>
          <p>Summary for New Event</p>
          <p>Event: {event.eventName}</p>
          <p>Date: {new Date(event.eventDateAndTime).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
          </p>
          <p>Time: {new Date(event.eventDateAndTime).toLocaleTimeString('en-US', { hour: '2-digit',
            minute: '2-digit' })}
          </p>
          <p>Venue: {event.eventVenue}</p>
          <p>Address: {event.eventAddress}</p>
          <p>Type of Event: {event.eventCategory}</p>
          <p>Summary: {event.eventSummary}</p>
          {/* eslint-disable-next-line no-underscore-dangle */}
          <button type="button" onClick={() => onViewEventButtonClick(event.eventId)}>View & Edit Event</button>
        </>
      )}
    </>)
}