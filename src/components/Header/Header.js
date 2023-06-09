import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HeaderWrapper, LinkWrapper } from './Header.styles';

export const Header = () => {
  const username = useSelector((store) => store.user.username);
  return (
    <HeaderWrapper>
      <LinkWrapper>
        <h3><Link to="/"> Home </Link></h3>
        <h3><Link to="/login"> Login </Link></h3>
        <h3><Link to="/users"> Users </Link></h3>
        <h3><Link to={`/users/${username}`}> Individual User </Link></h3>
        <h3><Link to="/events"> Events </Link></h3>
        <h3><Link to="/aboutus"> About Us </Link></h3>
      </LinkWrapper>
    </HeaderWrapper>
  )
}