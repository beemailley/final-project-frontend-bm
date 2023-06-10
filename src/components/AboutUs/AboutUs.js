import React from 'react';
import { Introduction, BridgetWrapper, BridgetInformation, FionaWrapper, FionaInformation, LinksWrapper, Img } from './AboutUs.styles'
import BridgetMailley from '../../images/BridgetMailley.jpg';
import FionaKlacar from '../../images/FionaKlacar.jpg';

export const AboutUs = () => {
  return (
    <>
      <Introduction>
        <h1>Welcome to Samla!</h1>
        <p>Meet B and F, expats who relocated to Stockholm,
      Sweden from the US and UK. Recognizing the need for
      a sense of community, they created Samla.
      Connect, share profiles, and organize events
      to turn your new city into a home.
        </p>
        <br /><br />
        <p style={{ textAlign: 'center' }}>
  Samla: Where you can find your people.

        </p>
      </Introduction>

      <BridgetWrapper>
        <BridgetInformation>
          <h2>Bridget Mailley</h2>
          <p>Bridget is...</p>
          <LinksWrapper>
            <p>Social media icons</p>
          </LinksWrapper>
        </BridgetInformation>
        <Img src={BridgetMailley} alt="Bridget Mailley" />
      </BridgetWrapper>
      <FionaWrapper>
        <Img src={FionaKlacar} alt="Fiona Klacar" />
        <FionaInformation>
          <h2>Fiona Klacar</h2>
          <p>Fiona is...</p>
          <LinksWrapper>
            <p>Social media icons</p>
          </LinksWrapper>
        </FionaInformation>
      </FionaWrapper>

    </>
  );
};
