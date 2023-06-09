import React from 'react';
import { Button } from '../Button/Button.styles';
import { ContentWrapper } from './Welcome.styles';

export const Welcome = () => {
  return (
    <ContentWrapper>
      <p>This is the Welcome Page</p>
      <Button type="cta">Let&apos;s go!</Button>
    </ContentWrapper>
  )
}