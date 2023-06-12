import React from 'react';
import { Button } from '../Button/Button.styles';
import { WelcomeWrapper, ButtonContainer, BrandContainer, CoffeeMugsImg } from './Welcome.styles';
// import SamlaLogo2 from '../../images/SamlaLogo2.png'
import CoffeeMugsLightBackground from '../../images/CoffeeMugsLightBackground.jpg'

export const Welcome = () => {
  return (

    <WelcomeWrapper>
      <BrandContainer>
        <h1>SAMLA</h1>
        <h2>Where you can find your people</h2>
      </BrandContainer>
      {/* <SamlaLogoImg
        src={SamlaLogo2}
        alt="Brand logo"
        aria-label="" /> */}
      <CoffeeMugsImg
        src={CoffeeMugsLightBackground}
        alt="Coffee mugs icon"
        aria-label="" />
      <ButtonContainer>
        <Button type="cta">Let&apos;s go!</Button>
      </ButtonContainer>
    </WelcomeWrapper>

  )
}