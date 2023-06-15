/* eslint-disable max-len */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { user } from 'reducers/user';
import { HeaderWrapper, LogoContainer, LinkWrapper, SamlaLogoImg, LinkStyles } from './Header.styles';
import SamlaLogoLong from '../../images/SamlaLogoLong.png'

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null))
    dispatch(user.actions.setUsername(null))
    dispatch(user.actions.setItems(null))
    dispatch(user.actions.setError(null))
    localStorage.clear();
    navigate('/')
  }
  return (
    <HeaderWrapper>
      <LogoContainer>
        <Link to="/">
          <SamlaLogoImg
            src={SamlaLogoLong}
            alt="Brand logo"
            aria-label="" />
        </Link>
      </LogoContainer>
      <LinkWrapper>
        <LinkStyles><Link to="/users">Members</Link></LinkStyles>
        <LinkStyles><Link to="/events">Events</Link></LinkStyles>
        <LinkStyles><Link to="/aboutus">About</Link></LinkStyles>
        {!accessToken && (<LinkStyles><Link to="/login">Login/Register</Link></LinkStyles>)}
        {accessToken && (<LinkStyles><Link onClick={onLogoutButtonClick}>Log Out</Link></LinkStyles>)}
      </LinkWrapper>
    </HeaderWrapper>
  )
}
