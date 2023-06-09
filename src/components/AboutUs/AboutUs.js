import React from 'react'
import { Link } from 'react-router-dom'

export const AboutUs = () => {
  return (
    <>
      <p>This is the AboutUs Page</p>
      <h3><Link to="/users"> Users </Link></h3>
      <h3><Link to="/events"> Events </Link></h3>
    </>
  )
}