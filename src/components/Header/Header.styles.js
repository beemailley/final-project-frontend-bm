import styled from 'styled-components';

export const HeaderWrapper = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* padding-right: 10%;
    padding-left: 10%; */
    justify-content: space-between;
    /* border: 2px red solid; */
    background-color: #F8F1F1;

    @media (max-width: 667px){

    }

    @media (min-width: 668px) and (max-width: 1024px) {

    }
`;

export const LogoContainer = styled.div`
  display: flex;
  padding-left: 2px;
`

export const SamlaLogoImg = styled.img`
    display: flex;
    justify-content: center;
    /* display: block;
    margin: 0 auto; */
    height: 40px;
    width: 70px;
    border-radius: 10px;
    
`

export const LinkWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    /* width: 100%; */

    h3 {
    font-size: 10px;
    max-width: calc(100% / 6);
  }
    `
