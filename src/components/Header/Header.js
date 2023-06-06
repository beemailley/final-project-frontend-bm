import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Header = () => {
  const username = useSelector((store) => store.user.username);
  return (
    <div className="header">
      <h3><Link to="/"> Home </Link></h3>
      <h3><Link to="/login"> Login </Link></h3>
      <h3><Link to="/users"> Users </Link></h3>
      <h3><Link to={`/users/${username}`}> Individual User </Link></h3>
      <h3><Link to="/events"> Events </Link></h3>
      <h3><Link to="/aboutus"> About Us </Link></h3>
    </div>
  )
}