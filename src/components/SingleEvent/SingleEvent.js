import React from 'react'
// import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { API_URL } from 'utils/urls'
import { events } from 'reducers/events';
import { useNavigate } from 'react-router-dom';

export const SingleEvent = () => {
  // const { eventId } = useParams()
  // const [eventDetails, setEventDetails] = useState([])
  // const [loading, setLoading] = useState(false)
  // const accessToken = useSelector((store) => store.user.accessToken)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const event = useSelector((store) => store.events)

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
  return (
    <>
      <p>This A Single Event Page</p>
      <p>event name: {event.eventName}</p>
      <button type="button" onClick={onBackButtonClick}>Back</button>
    </>
  )
}