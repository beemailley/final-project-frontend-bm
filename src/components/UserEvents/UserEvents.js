/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import styled from 'styled-components/macro';
import { CardContainer } from 'components/GlobalStyles';
import { Button } from '../Button/Button.styles';
import { AllEventsTitle, ButtonContainer, CreateEventButtonContainer, Label, Arrow, EventsList, Event } from './UserEvents.styles';

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

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
      <CardContainer>
        {loading && <p>Loading...</p>}
        <EventsList>
          {eventsList.map((event) => {
            return (
              <Event key={event._id}>
                <p><Label htmlFor="eventName">Event: </Label>{event.eventName}</p>
                <p><Label htmlFor="eventDateAndTime">Date: </Label>{new Date(event.eventDateAndTime).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
                </p>
                {/* eslint-disable-next-line object-curly-newline */}
                <p><Label htmlFor="eventDateAndTime">Time: </Label>{new Date(event.eventDateAndTime).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit' })}
                </p>
                <p><Label htmlFor="eventVenue">Venue: </Label>{event.eventVenue}</p>
                <p><Label htmlFor="eventAddress">Address: </Label>{event.eventAddress}</p>
                <p><Label htmlFor="eventCategory">Type of Event: </Label>{event.eventCategory}</p>
                <p><Label htmlFor="eventSummary">Summary: </Label>{event.eventSummary}</p>
                <p><Label htmlFor="eventSummary">Event Organizer: </Label>{event.createdBy}</p>
                <ButtonContainer>
                  <Arrow />
                  <Button type="button" onClick={() => onViewEventButtonClick(event._id)}>View</Button>
                </ButtonContainer>
              </Event>
            )
          })}
        </EventsList>
      </CardContainer>
      <CreateEventButtonContainer>
        <Button large><StyledLink to="/events/create"> Create an event! </StyledLink></Button>
      </CreateEventButtonContainer>
    </>
  )
}

