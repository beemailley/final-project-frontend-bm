import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { user } from 'reducers/user';

export const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null))
    dispatch(user.actions.setUsername(null))
    dispatch(user.actions.setItems(null))
    dispatch(user.actions.setError(null))
    navigate('/')
  }
  return (
    <div className="header">
      <h3><Link to="/"> Home </Link></h3>
      <h3><Link to="/login"> Login </Link></h3>
      <h3><Link to="/users"> Users </Link></h3>
      <h3><Link to="/events"> Events </Link></h3>
      <h3><Link to="/aboutus"> About Us </Link></h3>
      <button type="button" onClick={onLogoutButtonClick}>LOG OUT</button>
    </div>
  )
}