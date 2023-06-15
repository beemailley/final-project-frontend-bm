import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button.styles';
import { WelcomeWrapper, ButtonContainer, BrandContainer, SamlaLogoImg } from './NotFound.styles';
import GlobeIcon from '../../images/GlobeIcon.png'

export const NotFound = () => {
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate('/')
  }
  return (
    <WelcomeWrapper>
      <BrandContainer>
        <h1>Page Not Found</h1>
        <h2>Please return to the home page.</h2>
      </BrandContainer>
      <SamlaLogoImg
        src={GlobeIcon}
        alt="Brand logo"
        aria-label="" />
      <ButtonContainer>
        <Button type="button" onClick={handleBackButton}>Home</Button>
      </ButtonContainer>
    </WelcomeWrapper>

  )
}