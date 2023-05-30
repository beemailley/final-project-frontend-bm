import React from 'react'
import { Provider, BrowserRouter, Routes, Route } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Login } from 'components/Login'
import { Welcome } from 'components/Welcome/Welcome'
import { UserProfile } from 'components/UserProfile/UserProfile'
import { AllUsers } from 'components/AllUsers/AllUsers'
import { CityEvents } from 'components/CityEvents/CityEvents'
import { UserEvents } from 'components/UserEvents/UserEvents'
import { AboutUs } from 'components/AboutUs/AboutUs'
import { NotFound } from 'components/NotFound/NotFound'
import { user } from 'reducers/user';

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer
  });

  const store = configureStore({ reducer })

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="allusers" element={<AllUsers />} />
          <Route path="cityevents" element={<CityEvents />} />
          <Route path="userevents" element={<UserEvents />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>

  )
}
