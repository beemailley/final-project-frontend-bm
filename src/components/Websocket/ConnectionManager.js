import React from 'react';
import { socket } from '../../socket';

export const ConnectionManager = () => {
  function connect() {
    console.log('Connecting...');

    socket.connect();
  }

  function disconnect() {
    console.log('Disconnecting...');
    socket.disconnect();
  }

  return (
    <>
      <button type="button" onClick={connect}>Connect</button>
      <button type="button" onClick={disconnect}>Disconnect</button>
    </>
  );
}