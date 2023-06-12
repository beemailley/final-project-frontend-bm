import React from 'react';
import { InnerWrapper } from 'components/GlobalStyles'
import { Header } from './Header/Header'

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <InnerWrapper>
        {children}
      </InnerWrapper>
    </>

  )
}