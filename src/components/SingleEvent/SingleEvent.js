/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { events } from 'reducers/events';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CardContainer } from 'components/GlobalStyles';
import { Button } from '../Button/Button.styles';
import { EventName, Label, Event, JoinEventContainer, BackAndEditContainer, EditEvent, ValidationContainer, SaveButtonContainer } from './SingleEvent.styles';

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
          dispatch(events.actions.setEventAttendees(data.response.eventAttendees))
          // console.log(data.response.eventAttendees)
          setUpdatedEvent({
            eventName: data.response.eventName || '',
            eventDateAndTime: new Date(data.response.eventDateAndTime) || new Date(),
            eventVenue: data.response.eventVenue || '',
            eventAddress: data.response.eventAddress || '',
            eventCategory: data.response.eventCategory || '',
            eventSummary: data.response.eventSummary || '',
            eventAttendees: data.response.eventAttendees || []
          })
        } else {
          dispatch(events.actions.setEventName(null))
          dispatch(events.actions.setEventDateAndTime(null))
          dispatch(events.actions.setEventVenue(null))
          dispatch(events.actions.setEventAddress(null))
          dispatch(events.actions.setEventCategory(null))
          dispatch(events.actions.setEventSummary(null))
          dispatch(events.actions.setCreatedBy(null))
          dispatch(events.actions.setEventAttendees([]))
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
    dispatch(events.actions.setEventAttendees([]))
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
      .then((data) => {
        if (data.success) {
          alert('Thanks for joining! The event organizer will be notified.')
        } else {
          alert(data.response)
        }
      })
  }

  return (
    <>
      <EventName>Event Details</EventName>
      {/* render the static event information */}
      <CardContainer>
        {!isEditing && (
          <Event>
            <p><Label htmlFor="eventName">Event name: </Label>{event.eventName}</p>
            <p><Label htmlFor="eventDateAndTime">Date: </Label>{new Date(event.eventDateAndTime).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
            </p>
            <p><Label htmlFor="eventDateAndTime">Time: </Label>{new Date(event.eventDateAndTime).toLocaleTimeString('en-US', { hour: '2-digit',
              minute: '2-digit' })}
            </p>
            <p><Label htmlFor="eventVenue">Venue: </Label>{event.eventVenue}</p>
            <p><Label htmlFor="eventAddress">Address: </Label>{event.eventAddress}</p>
            <p><Label htmlFor="eventCategory">Type of event: </Label>{event.eventCategory}</p>
            <p><Label htmlFor="eventSummary">Summary: </Label>{event.eventSummary}</p>
            <p><Label htmlFor="createdBy">Event organizer: </Label>{event.createdBy}</p>
            <p><Label htmlFor="attendee">Attendees: </Label></p>
            {event.eventAttendees.map((attendee) => {
              return (
                <p key={attendee._id}>{attendee.attendeeName}</p>
              )
            })}
            <JoinEventContainer>
              <Button large type="button" onClick={addAttendee}>Join the event!</Button>
            </JoinEventContainer>
          </Event>
        )}
      </CardContainer>

      {isEditing && (
        // render the form fields for editing
        <CardContainer>
          <EditEvent onSubmit={onFormSubmit}>
            <label htmlFor="eventName">
              Event Name:
              <br />
              <input
                type="text"
                name="eventName"
                value={updatedEvent.eventName}
                onChange={handleInputChange} />
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="eventdateandtime">
            When is the event?
              <br />
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
              <br />
              <input
                type="text"
                name="eventVenue"
                value={updatedEvent.eventVenue}
                onChange={handleInputChange} />
            </label>
            <label htmlFor="eventAddress">
              Event Address:
              <br />
              <input
                type="text"
                name="eventAddress"
                value={updatedEvent.eventAddress}
                onChange={handleInputChange} />
            </label>
            <label htmlFor="eventCategory">
              This Event is for/about:
              <br />
              <select name="eventCategory" value={updatedEvent.eventCategory} onChange={handleInputChange}>
                <option value="">Please select one:</option>
                <option value="">Select an interest</option>
                <option value="Animal Lovers">Animal Lovers</option>
                <option value="Arts & Music">Arts & Music</option>
                <option value="Books">Books</option>
                <option value="Career">Career</option>
                <option value="Community">Community</option>
                <option value="Families">Families</option>
                <option value="Food & Drinks">Food & Drinks</option>
                <option value="Games">Games</option>
                <option value="Health">Health</option>
                <option value="LGBTQ+">LGBTQ+</option>
                <option value="Out in the City">Out in the City</option>
                <option value="Parents">Parents</option>
                <option value="Spirituality">Spirituality</option>
                <option value="Sports">Sports</option>
                <option value="Technology">Technology</option>
              </select>
            </label>
            <label htmlFor="eventSummary">
              Event Summary:
              <br />
              <input
                type="text"
                name="eventSummary"
                value={updatedEvent.eventSummary}
                onChange={handleInputChange} />
            </label>
            <p>Event Organizer: {event.createdBy}</p>
            <ValidationContainer>
              {allowedToEdit && validationErrors && Object.keys(validationErrors).length > 0 && (
                <h3>Please ensure:</h3>
              )}
              {validationErrors.eventName && <p>{validationErrors.eventName}</p>}
              {validationErrors.eventCategory && <p>{validationErrors.eventCategory}</p>}
              {validationErrors.eventSummary && <p>{validationErrors.eventSummary}</p>}
            </ValidationContainer>
            <SaveButtonContainer><Button type="submit">Save</Button></SaveButtonContainer>
          </EditEvent>
        </CardContainer>)}

      <BackAndEditContainer>
        <Button type="button" onClick={onBackButtonClick}>Back</Button>
        {allowedToEdit && !isEditing && (<Button type="button" onClick={onEditButtonClick}>Edit</Button>)}
      </BackAndEditContainer>
    </>
  )
}