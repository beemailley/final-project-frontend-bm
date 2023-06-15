import React from 'react' // for websocket: useState and useEffect needed
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Login } from 'components/Login/Login'
import { Welcome } from 'components/Welcome/Welcome'
import { UserProfile } from 'components/UserProfile/UserProfile'
import { AllUsers } from 'components/AllUsers/AllUsers'
import { UserEvents } from 'components/UserEvents/UserEvents'
import { AboutUs } from 'components/AboutUs/AboutUs'
import { NotFound } from 'components/NotFound/NotFound'
import { user } from 'reducers/user';
import { events } from 'reducers/events'
import { Layout } from 'components/Layout'
import { SingleEvent } from 'components/SingleEvent/SingleEvent'
import { CreateEvent } from 'components/CreateEvent/CreateEvent'
import { OuterWrapper } from 'components/GlobalStyles'

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
    user: user.reducer,
    events: events.reducer
  });

  const store = configureStore({ reducer })

  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <ConnectionState isConnected={isConnected} />
        <ConnectionManager />
        <Events events={fooEvents} />
        <MyForm /> */}
        <OuterWrapper>
          <Routes>
            <Route path="/" element={<Welcome />} />
            {/* <Route path="/myform" element={<MyForm />} /> */}
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/users/:username" element={<Layout><UserProfile /></Layout>} />
            <Route path="/users" element={<Layout><AllUsers /></Layout>} />
            {/* <Route path="/cityevents" element={<CityEvents />} /> */}
            <Route path="/events" element={<Layout><UserEvents /></Layout>} />
            <Route path="/events/create" element={<Layout><CreateEvent /></Layout>} />
            <Route path="/events/:eventId" element={<Layout><SingleEvent /></Layout>} />
            <Route path="/aboutus" element={<Layout><AboutUs /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </OuterWrapper>
      </BrowserRouter>
    </Provider>

  )
}
