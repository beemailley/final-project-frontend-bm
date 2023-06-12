import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { events } from 'reducers/events';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const SingleEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { eventId } = useParams()
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))
  const event = useSelector((store) => store.events)
  const currentuser = JSON.parse(localStorage.getItem('currentUserUsername'))
  // to edit an event
  const [isEditing, setIsEditing] = useState(false)
  const [allowedToEdit, setAllowedToEdit] = useState(false)
  const [validationErrors, setValidationErrors] = useState('')
  const [updatedEvent, setUpdatedEvent] = useState({
    eventName: '',
    eventDateAndTime: new Date(),
    eventVenue: '',
    eventAddress: '',
    eventCategory: '',
    eventSummary: ''
  })

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate]);

  const validationRules = [
    { fieldName: 'eventName',
      validationFunction: (value) => {
        const MIN_EVENTNAME_LENGTH = 5;
        const MAX_EVENTNAME_LENGTH = 100;
        if (value.length < MIN_EVENTNAME_LENGTH || value.length > MAX_EVENTNAME_LENGTH) {
          return 'Event name must be between 5 and 100 characters.'
        }
        return '';
      },
      errorMessage: 'Invalid event name' },
    { fieldName: 'eventCategory',
      validationFunction: (value) => {
        if (value === '') {
          return 'Please select a category';
        }
        return '';
      },
      errorMessage: 'No category selected' },
    { fieldName: 'eventSummary',
      validationFunction: (value) => {
        const MIN_EVENTSUMMARY_LENGTH = 20;
        const MAX_EVENTSUMMARY_LENGTH = 280;
        if (value.length < MIN_EVENTSUMMARY_LENGTH || value.length > MAX_EVENTSUMMARY_LENGTH) {
          return 'Event summary must be between 20 and 280 characters.'
        }
        return '';
      },
      errorMessage: 'Invalid event name' }
  ];

  useEffect(() => {
    const handleEditPermissions = () => {
      if (event.createdBy === currentuser) {
        // console.log(event.createdBy)
        // console.log(currentuser)
        setAllowedToEdit(true)
      } else {
        setAllowedToEdit(false)
      }
    }
    handleEditPermissions()
  }, [event.createdBy, currentuser])

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
        if (data.success) {
          dispatch(events.actions.setEventName(data.response.eventName))
          dispatch(events.actions.setEventDateAndTime(data.response.eventDateAndTime))
          dispatch(events.actions.setEventVenue(data.response.eventVenue))
          dispatch(events.actions.setEventAddress(data.response.eventAddress))
          dispatch(events.actions.setEventCategory(data.response.eventCategory))
          dispatch(events.actions.setEventSummary(data.response.eventSummary))
          dispatch(events.actions.setCreatedBy(data.response.createdBy))
          setUpdatedEvent({
            eventName: data.response.eventName || '',
            eventDateAndTime: new Date(data.response.eventDateAndTime) || new Date(),
            eventVenue: data.response.eventVenue || '',
            eventAddress: data.response.eventAddress || '',
            eventCategory: data.response.eventCategory || '',
            eventSummary: data.response.eventSummary || ''
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
  }

  const handleInputChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setUpdatedEvent((prevState) => {
        // eslint-disable-next-line prefer-object-spread
        const updatedState = Object.assign({}, prevState);
        updatedState[name] = value;
        return updatedState;
      });
    } else if (e) {
      setUpdatedEvent((prevState) => {
        // eslint-disable-next-line prefer-object-spread
        const updatedState = Object.assign({}, prevState);
        updatedState.eventDateAndTime = e;
        return updatedState;
      });
    }
  }

  const onFormSubmit = (e) => {
    e.preventDefault()

    if (isEditing) {
      const newValidationErrors = {};
      validationRules.forEach((rule) => {
        const { fieldName, validationFunction } = rule;
        const fieldValue = updatedEvent[fieldName];
        const errorMessage = validationFunction(fieldValue);

        if (errorMessage) {
          newValidationErrors[fieldName] = errorMessage;
        }
      });

      if (Object.keys(newValidationErrors).length > 0) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors('');

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
          dispatch(events.actions.setEventName(data.response.eventName))
          dispatch(events.actions.setEventDateAndTime(data.response.eventDateAndTime))
          dispatch(events.actions.setEventVenue(data.response.eventVenue))
          dispatch(events.actions.setEventAddress(data.response.eventAddress))
          dispatch(events.actions.setEventCategory(data.response.eventCategory))
          dispatch(events.actions.setEventSummary(data.response.eventSummary))
        })
        .finally(() => setIsEditing(false))
    }
  }

  const addAttendee = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    fetch(API_URL(`events/${eventId}/attendees`), options)
      .then((res) => res.json())
      .then(alert('Thanks for joining! The event organizer will be notified.'))
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
          <p>Type of Event: {event.eventCategory}</p>
          <p>Summary: {event.eventSummary}</p>
          <p>Event Organizer: {event.createdBy}</p>
          {/* <p>Attendees:</p>
          {event.eventAttendees.map((attendee) => {
            return (
              <p>{attendee.attendeeName}</p>
            )
          })} */}
          <button type="button" onClick={addAttendee}>Join the Event!</button>
          <button type="button" onClick={onBackButtonClick}>Back</button>
          {allowedToEdit && (<button type="button" onClick={onEditButtonClick}>Edit</button>)}
        </>
      )}
      {isEditing && (
        <>
          <p>Is Editing</p>
          <form onSubmit={onFormSubmit}>
            <label htmlFor="eventName">
              Event Name:
              <input
                type="text"
                name="eventName"
                value={updatedEvent.eventName}
                onChange={handleInputChange} />
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="eventdateandtime">
            When is the event?
              <DatePicker
                id="eventdateandtime"
                name="eventDateAndTime"
                selected={updatedEvent.eventDateAndTime}
                onChange={handleInputChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa" />
            </label>
            <label htmlFor="eventVenue">
              Event Venue:
              <input
                type="text"
                name="eventVenue"
                value={updatedEvent.eventVenue}
                onChange={handleInputChange} />
            </label>
            <label htmlFor="eventAddress">
              Event Address:
              <input
                type="text"
                name="eventAddress"
                value={updatedEvent.eventAddress}
                onChange={handleInputChange} />
            </label>
            <label htmlFor="eventCategory">
              Type of Event:
              <select name="eventCategory" value={updatedEvent.eventCategory} onChange={handleInputChange}>
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
                value={updatedEvent.eventSummary}
                onChange={handleInputChange} />
            </label>
            <p>Event Organizer: {event.createdBy}</p>
            <button type="submit">Submit</button>
          </form>
        </>)}
      {validationErrors.eventName && <p>{validationErrors.eventName}</p>}
      {validationErrors.eventCategory && <p>{validationErrors.eventCategory}</p>}
      {validationErrors.eventSummary && <p>{validationErrors.eventSummary}</p>}
    </>
  )
}