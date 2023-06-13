import React from 'react';
import { InnerWrapper } from 'components/GlobalStyles'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <InnerWrapper>
        {children}
      </InnerWrapper>
      <Footer />
    </>

  )
}