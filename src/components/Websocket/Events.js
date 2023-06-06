import React from 'react';

export const Events = ({ events }) => {
  return (
    <ul>
      {
        events.map((event) => <li key={event}>{event}</li>)
      }
    </ul>
  );
}