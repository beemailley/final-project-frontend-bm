import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { user } from 'reducers/user';
import { API_URL } from 'utils/urls';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    console.log(username);
  }, [username]);

  useEffect(() => {
    if (accessToken) {
      // navigate('/users')
      navigate(`/users/${username}`)
    }
  }, [accessToken, navigate, username]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          dispatch(user.actions.setAccessToken(data.response.accessToken))
          dispatch(user.actions.setUsername(data.response.username))
          dispatch(user.actions.setUserId(data.response.id))
          dispatch(user.actions.setError(null))
          // navigate('/users')
          navigate(`/users/${username}`)
        } else {
          dispatch(user.actions.setAccessToken(null))
          dispatch(user.actions.setUsername(null))
          dispatch(user.actions.setUserId(null))
          dispatch(user.actions.setError(data.response))
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <h1>Expat App</h1>
      <label htmlFor="register">Register
        <input
          type="radio"
          id="register"
          checked={mode === 'register'}
          onChange={() => setMode('register')} /><br />
      </label>
      <label htmlFor="login">Login
        <input
          type="radio"
          id="login"
          checked={mode === 'login'}
          onChange={() => setMode('login')} />
      </label>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} /><br />
        </label>
        <label htmlFor="password">Password
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}