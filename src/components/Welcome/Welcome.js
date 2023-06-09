import React from 'react'
import { OuterWrapper, InnerWrapper } from 'components/GlobalStyles'
import { Button } from '../Button';

export const Welcome = () => {
  return (
    <OuterWrapper>
      <InnerWrapper>
        <p>This is the Welcome Page</p>
        <Button submit text="Let's go!" />
      </InnerWrapper>
    </OuterWrapper>
  )
}