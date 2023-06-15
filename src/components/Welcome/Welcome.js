import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button.styles';
import { WelcomeWrapper, ButtonContainer, BrandContainer, SamlaLogoImg } from './Welcome.styles';
import GlobeIcon from '../../images/GlobeIcon.png'

export const Welcome = () => {
  const navigate = useNavigate();
  const handleGoButton = () => {
    navigate('/login')
  }
  return (
    <WelcomeWrapper>
      <BrandContainer>
        <h1>SAMLA</h1>
        <h2>Where you can find your people</h2>
      </BrandContainer>
      <SamlaLogoImg
        src={GlobeIcon}
        alt="Brand logo"
        aria-label="" />
      <ButtonContainer>
        <Button type="button" onClick={handleGoButton}>Let&apos;s go!</Button>
      </ButtonContainer>
    </WelcomeWrapper>

  )
}