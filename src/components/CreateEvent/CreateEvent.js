/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom';
import { events } from 'reducers/events';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CardContainer } from 'components/GlobalStyles';
import { Button } from '../Button/Button.styles';
import { CreateEventWrapper, ButtonContainer } from './CreateEvent.styles';

export const CreateEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const { eventId } = useParams()
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))
  const event = useSelector((store) => store.events)
  const [isEditing, setIsEditing] = useState(true)
  const [validationErrors, setValidationErrors] = useState('')
  const [newEvent, setNewEvent] = useState({
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
          return 'Please select a category.';
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

  const handleInputChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setNewEvent((prevState) => {
        // eslint-disable-next-line prefer-object-spread
        const updatedState = Object.assign({}, prevState);
        updatedState[name] = value;
        return updatedState;
      });
    } else if (e) {
      setNewEvent((prevState) => {
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
        const fieldValue = newEvent[fieldName];
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
          // console.log(data.response)
          dispatch(events.actions.setEventId(data.response._id))
          dispatch(events.actions.setEventName(data.response.eventName))
          dispatch(events.actions.setEventDateAndTime(data.response.eventDateAndTime))
          dispatch(events.actions.setEventVenue(data.response.eventVenue))
          dispatch(events.actions.setEventAddress(data.response.eventAddress))
          dispatch(events.actions.setEventCategory(data.response.eventCategory))
          dispatch(events.actions.setEventSummary(data.response.eventSummary))
          dispatch(events.actions.setCreatedBy(data.response.createdBy))
        // eslint-disable-next-line no-underscore-dangle
        // navigate(`/events/${data.response._id}`)
        })
        .finally(() => setIsEditing(false))
    }
  }

  const onViewEventButtonClick = (eventId) => {
    navigate(`/events/${eventId}`)
  }

  return (
    <CardContainer>
      {isEditing && (
        <CreateEventWrapper>
          <form onSubmit={onFormSubmit}>
            <label htmlFor="eventName">
              Event Name:
              <br />
              <input
                type="text"
                name="eventName"
                onChange={handleInputChange} />
            </label>
            <br />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="eventdateandtime">
            When is the event?
              <br />
              <DatePicker
                id="eventdateandtime"
                name="eventDateAndTime"
                selected={newEvent.eventDateAndTime}
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
                onChange={handleInputChange} />
            </label>
            <br />
            <label htmlFor="eventAddress">
              Event Address:
              <br />
              <input
                type="text"
                name="eventAddress"
                onChange={handleInputChange} />
            </label>
            <br />
            <label htmlFor="eventCategory">
              This Event is for/about:
              <select name="eventCategory" onChange={handleInputChange}>
                <option value="">Please select one:</option>
                <option value="Animal Lovers">Animal Lovers</option>
                <option value="Arts & Music">Arts & Music</option>
                <option value="Books">Books</option>
                <option value="Career">Career</option>
                <option value="Families">Families</option>
                <option value="Food & Drinks">Food & Drinks</option>
                <option value="Games">Games</option>
                <option value="Health">Health</option>
                <option value="LGBTQ+">LGBTQ+</option>
                <option value="Out in the City">Out in the City</option>
                <option value="Parents">Parents</option>
                <option value="Spirituality">Spirituality</option>
                <option value="Sports">Sports</option>
                <option value="Students">Students</option>
                <option value="Technology">Technology</option>
              </select>
            </label>
            <br />
            <label htmlFor="eventSummary">
              Event Summary:
              <br />
              <input
                type="text"
                name="eventSummary"
                onChange={handleInputChange} />
            </label>
            <ButtonContainer>
              <Button type="submit">Submit</Button>
            </ButtonContainer>
          </form>
          {validationErrors.eventName && <p>{validationErrors.eventName}</p>}
          {validationErrors.eventCategory && <p>{validationErrors.eventCategory}</p>}
          {validationErrors.eventSummary && <p>{validationErrors.eventSummary}</p>}
        </CreateEventWrapper>
      )}
      {!isEditing && (
        <>
          <p>Your event has been created!</p>
          <p>Please click below to view and edit your event.</p>
          {/* <p>Event: {event.eventName}</p>
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
          <p>Event Organizer: {event.createdBy}</p> */}
          {/* eslint-disable-next-line no-underscore-dangle */}

          <Button type="button" onClick={() => onViewEventButtonClick(event.eventId)}>View & Edit Event</Button>

        </>
      )}
    </CardContainer>
  )
}