import React from 'react' // for websocket: useState and useEffect needed
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Login } from 'components/Login/Login'
import { Welcome } from 'components/Welcome/Welcome'
import { UserProfile } from 'components/UserProfile/UserProfile'
import { AllUsers } from 'components/AllUsers/AllUsers'
import { CityEvents } from 'components/CityEvents/CityEvents'
import { UserEvents } from 'components/UserEvents/UserEvents'
import { AboutUs } from 'components/AboutUs/AboutUs'
import { NotFound } from 'components/NotFound/NotFound'
import { user } from 'reducers/user';
// import { socket } from './socket';
// import { ConnectionState } from './components/ConnectionState';
// import { ConnectionManager } from './components/ConnectionManager';
// import { MyForm } from './components/MyForm';
// import { Events } from './components/Events';

export const App = () => {
  // websocket code:
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onFooEvent(value) {
  //     setFooEvents((previous) => [...previous, value]);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('foo', onFooEvent);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     socket.off('foo', onFooEvent);
  //   };
  // }, []);

  const reducer = combineReducers({
    user: user.reducer
  });

  const store = configureStore({ reducer })

  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <ConnectionState isConnected={isConnected} />
        <ConnectionManager />
        <Events events={fooEvents} />
        <MyForm /> */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          {/* <Route path="/myform" element={<MyForm />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/users/:username" element={<UserProfile />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/cityevents" element={<CityEvents />} />
          <Route path="/userevents" element={<UserEvents />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>

  )
}
