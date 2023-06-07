import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { events } from 'reducers/events';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from 'utils/urls';

export const SingleEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { eventId } = useParams()
  const accessToken = useSelector((store) => store.user.accessToken)
  const event = useSelector((store) => store.events)
  // to edit an event
  const [isEditing, setIsEditing] = useState(false)
  const [updatedEvent, setUpdatedEvent] = useState({
    eventName: ''
  })

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    };
    fetch(API_URL(`events/${eventId}`), options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          dispatch(events.actions.setEventName(data.response.eventName))
          dispatch(events.actions.setEventDateAndTime(data.response.eventDateAndTime))
          dispatch(events.actions.setEventVenue(data.response.eventVenue))
          dispatch(events.actions.setEventAddress(data.response.eventAddress))
          dispatch(events.actions.setEventCategory(data.response.eventCategory))
          dispatch(events.actions.setEventSummary(data.response.eventSummary))
          dispatch(events.actions.setCreatedBy(data.response.createdBy))
          setUpdatedEvent({
            eventName: data.response.eventName || ''
          })
        } else {
          dispatch(events.actions.setEventName(null))
          dispatch(events.actions.setEventDateAndTime(null))
          dispatch(events.actions.setEventVenue(null))
          dispatch(events.actions.setEventAddress(null))
          dispatch(events.actions.setEventCategory(null))
          dispatch(events.actions.setEventSummary(null))
          dispatch(events.actions.setCreatedBy(null))
        }
      })
      .catch((error) => console.log(error))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, dispatch])

  console.log(accessToken)

  const onBackButtonClick = () => {
    dispatch(events.actions.setEventName(null))
    dispatch(events.actions.setEventDateAndTime(null))
    dispatch(events.actions.setEventVenue(null))
    dispatch(events.actions.setEventAddress(null))
    dispatch(events.actions.setEventCategory(null))
    dispatch(events.actions.setEventSummary(null))
    dispatch(events.actions.setCreatedBy(null))
    navigate('/events')
  }

  const onEditButtonClick = () => {
    setIsEditing(true)
    console.log(accessToken)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    console.log(accessToken)
    console.log(updatedEvent)
    console.log(eventId)
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify(updatedEvent)
    }
    fetch(API_URL(`events/${eventId}`), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch(events.actions.setEventName(updatedEvent.eventName))
      })
      .finally(() => setIsEditing(false))
  }

  return (
    <>
      {!isEditing && (
        <>
          <p>This A Single Event Page</p>
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
          <p>Summary: {event.eventSummary}</p>
          <button type="button" onClick={onBackButtonClick}>Back</button>
          <button type="button" onClick={onEditButtonClick}>Edit</button>
        </>
      )}
      {isEditing && (
        <>
          <p>Is Editing</p>
          <form onSubmit={onFormSubmit}>
            <label htmlFor="eventname">
          Event Name:
              <input
                type="text"
                name="eventname"
                value={updatedEvent.eventName}
                onChange={(e) => setUpdatedEvent({ eventName: e.target.value })} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </>)}
    </>
  )
}