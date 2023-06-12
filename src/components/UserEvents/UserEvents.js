/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';

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
      <h2>All Events</h2>
      <h3><Link to="/events/create"> Create Event </Link></h3>
      {loading && <p>Loading...</p>}
      <section>
        {eventsList.map((event) => {
          return (
            <div key={event._id}>
              <p>Event: {event.eventName}</p>
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
              <p>Venue: {event.eventVenue}</p>
              <p>Address: {event.eventAddress}</p>
              <p>Type of Event: {event.eventCategory}</p>
              <p>Summary: {event.eventSummary}</p>
              <p>Event Organizer: {event.createdBy}</p>
              <button type="button" onClick={() => onViewEventButtonClick(event._id)}>View Event</button>
            </div>
          )
        })}
      </section>
    </>
  )
}

