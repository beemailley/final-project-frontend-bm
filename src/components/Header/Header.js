import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { user } from 'reducers/user';
import { HeaderWrapper, LogoContainer, LinkWrapper, SamlaLogoImg } from './Header.styles';
import SamlaLogo from '../../images/SamlaLogo.png'

export const Header = () => {
  const username = useSelector((store) => store.user.username);
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
        <SamlaLogoImg
          src={SamlaLogo}
          alt="Brand logo"
          aria-label="" />
      </LogoContainer>
      <LinkWrapper>
        <h3><Link to="/"> Home </Link></h3>
        <h3><Link to="/login"> Login/Register </Link></h3>
        <h3><Link to="/users"> Users </Link></h3>
        <h3><Link to={`/users/${username}`}> Individual User </Link></h3>
        <h3><Link to="/events"> Events </Link></h3>
        <h3><Link to="/aboutus"> About Us </Link></h3>
        {accessToken && (<button type="button" onClick={onLogoutButtonClick}>LOG OUT</button>)}
      </LinkWrapper>
    </HeaderWrapper>
  )
}
