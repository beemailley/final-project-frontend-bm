/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import { CardContainer } from 'components/GlobalStyles';
import { TitleAboutUs, Introduction, AboutUsInfo, BridgetWrapper, BridgetInformation, FionaWrapper, FionaInformation, LinksWrapper, Icon, ImgContainerBridget, ImgContainerFiona, Img, LinkStyles, SamlaLogoImg } from './AboutUs.styles'
import BridgetMailley from '../../images/BridgetMailley.jpg';
import FionaKlacar from '../../images/FionaKlacar.jpg';
import linkedInIcon from '../../images/linkedin.svg';
import githubIcon from '../../images/github.svg';
import laptopIcon from '../../images/laptop.svg';
import GlobeIcon from '../../images/GlobeIcon.png'

export const AboutUs = () => {
  return (
    <>
      <TitleAboutUs>Welcome!</TitleAboutUs>
      <CardContainer>
        <Introduction>
          <h2 style={{ textAlign: 'center' }}>About Samlas</h2>
          <p style={{ textAlign: 'justify' }}>Meet Bridget and Fiona, expats who relocated to Stockholm,
      Sweden from the US and UK. Recognizing the need for
      a sense of community, they created Samlas.
      Connect, share profiles, and organize events
      to turn your new city into home.
          </p>
          <p style={{ textAlign: 'center' }}>
  Samlas: Where you can find your people.
          </p>

          <LinksWrapper>
            <LinkStyles><Link to="/users">Find Members</Link></LinkStyles>
            <SamlaLogoImg
              src={GlobeIcon}
              alt="Brand logo"
              aria-label="" />
            <LinkStyles><Link to="/events">Find Events</Link></LinkStyles>
          </LinksWrapper>

        </Introduction>
        <AboutUsInfo>
          <h2 style={{ textAlign: 'center' }}>About Us</h2>
          <BridgetWrapper>
            <BridgetInformation>
              <h2>Bridget Mailley</h2>
              <p>Bridget is a talented developer who is pursuing a career change in order to spend more of her time solving problems and creating things that make life better for people. She is excited to keep deepening her knowledge, exploring new skills, and continuing to improve as a developer.</p>
              <LinksWrapper justify="start">
                <a href="https://www.linkedin.com/in/bridget-mailley/" target="_blank" rel="noopener noreferrer">
                  <Icon
                    src={linkedInIcon}
                    alt="LinkedIn icon"
                    aria-label="view Bridget's linkedIn page" />
                </a>
                <a href="https://github.com/beemailley" target="_blank" rel="noopener noreferrer">
                  <Icon
                    src={githubIcon}
                    alt="GitHub icon"
                    aria-label="view Bridget's GitHub page" />
                </a>
                <a href="https://bridgetmailley.com/" target="_blank" rel="noopener noreferrer">
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
              <p>Fiona is a passionate developer with a background in music and education. She brings a unique blend of creativity, collaboration, skills, and perspectives to her programming work. Above all, she is committed to building intuitive user experiences with professional results. </p>
              <LinksWrapper justify="start">
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

        </AboutUsInfo>
      </CardContainer>

    </>
  );
};
