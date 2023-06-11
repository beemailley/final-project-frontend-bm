import React from 'react';
import { Introduction, BridgetWrapper, BridgetInformation, FionaWrapper, FionaInformation, LinksWrapper, Icon, ImgContainerBridget, ImgContainerFiona, Img } from './AboutUs.styles'
import BridgetMailley from '../../images/BridgetMailley.jpg';
import FionaKlacar from '../../images/FionaKlacar.jpg';
import linkedInIcon from '../../images/linkedin.svg';
import githubIcon from '../../images/github.svg';
import laptopIcon from '../../images/laptop.svg';

export const AboutUs = () => {
  return (
    <>
      <Introduction>
        <h1>Welcome to Samla!</h1>
        <p>Meet Bridget and Fiona, expats who relocated to Stockholm,
      Sweden from the US and UK. Recognizing the need for
      a sense of community, they created Samla.
      Connect, share profiles, and organize events
      to turn your new city into home.
        </p>
        <br />
        <p style={{ textAlign: 'center' }}>
  Samla: Where you can find your people.

        </p>
      </Introduction>

      <BridgetWrapper>
        <BridgetInformation>
          <h2>Bridget Mailley</h2>
          <p>Bridget is...</p>
          <LinksWrapper>
            <a href="" target="_blank" rel="noopener noreferrer">
              <Icon
                src={linkedInIcon}
                alt="LinkedIn icon"
                aria-label="view Bridget's linkedIn page" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <Icon
                src={githubIcon}
                alt="GitHub icon"
                aria-label="view Bridget's GitHub page" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <Icon
                src={laptopIcon}
                alt="Laptop icon"
                aria-label="view Bridget's portfolio" />
            </a>
          </LinksWrapper>
        </BridgetInformation>
        <ImgContainerBridget>
          <Img src={BridgetMailley} alt="Bridget Mailley" />
        </ImgContainerBridget>
      </BridgetWrapper>
      <FionaWrapper>
        <ImgContainerFiona>
          <Img src={FionaKlacar} alt="Fiona Klacar" />
        </ImgContainerFiona>
        <FionaInformation>
          <h2>Fiona Klacar</h2>
          <p>Fiona is...</p>
          <LinksWrapper>
            <a href="https://www.linkedin.com/in/fiona-klacar/" target="_blank" rel="noopener noreferrer">
              <Icon
                src={linkedInIcon}
                alt="LinkedIn icon"
                aria-label="view Fiona's linkedIn page" />
            </a>
            <a href="https://github.com/FionaKlacar" target="_blank" rel="noopener noreferrer">
              <Icon
                src={githubIcon}
                alt="GitHub icon"
                aria-label="view Fiona's GitHub page" />
            </a>
            <a href="https://fiona-klacar-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer">
              <Icon
                src={laptopIcon}
                alt="Laptop icon"
                aria-label="view Fiona's portfolio" />
            </a>
          </LinksWrapper>
        </FionaInformation>
      </FionaWrapper>

    </>
  );
};
