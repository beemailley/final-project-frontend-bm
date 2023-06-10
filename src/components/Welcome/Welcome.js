import React from 'react';
import { Button } from '../Button/Button.styles';
import { WelcomeWrapper } from './Welcome.styles';

export const Welcome = () => {
  return (
    <WelcomeWrapper>
      <p>This is the Welcome Page</p>
      <Button type="cta">Let&apos;s go!</Button>
    </WelcomeWrapper>
  )
}