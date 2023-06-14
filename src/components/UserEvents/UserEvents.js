/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import { CardContainer } from 'components/GlobalStyles';
import { Button } from '../Button/Button.styles';
import { AllEventsTitle, ButtonContainer, Label } from './UserEvents.styles';

export const UserEvents = () => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))
  const [eventsList, setEventsList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      };

      fetch(API_URL('events'), options)
        .then((response) => response.json())
        .then((data) => setEventsList(data.response))
        .catch((error) => console.log(error))
        .finally(() => { setLoading(false) })
    } else {
      alert('Please log in')
    }
  }, [accessToken])

  const onViewEventButtonClick = (eventId) => {
    navigate(`/events/${eventId}`)
  }
  return (
    <>
      <AllEventsTitle>All Events</AllEventsTitle>
      {loading && <p>Loading...</p>}
      <CardContainer>
        {eventsList.map((event) => {
          return (
            <div key={event._id}>
              <p><Label htmlFor="eventName">Event: </Label>{event.eventName}</p>
              <p>Date: {new Date(event.eventDateAndTime).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
              </p>
              {/* eslint-disable-next-line object-curly-newline */}
              <p>Time: {new Date(event.eventDateAndTime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit' })}
              </p>
              <p><Label htmlFor="eventVenue">Venue: </Label>{event.eventVenue}</p>
              <p><Label htmlFor="eventAddress">Address: </Label>{event.eventAddress}</p>
              <p><Label htmlFor="eventCategory">Type of Event: </Label>{event.eventCategory}</p>
              <p><Label htmlFor="eventSummary">Summary: </Label>{event.eventSummary}</p>
              <p><Label htmlFor="eventSummary">Event Organizer: </Label>{event.createdBy}</p>
              <ButtonContainer>
                <Button type="button" onClick={() => onViewEventButtonClick(event._id)}>View</Button>
              </ButtonContainer>
            </div>
          )
        })}
      </CardContainer>
      <h3><Link to="/events/create"> Create Event </Link></h3>
    </>
  )
}

