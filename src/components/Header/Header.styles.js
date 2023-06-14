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

    /* @media (max-width: 667px){

    }

    @media (min-width: 668px) and (max-width: 1024px) {

    } */
`;

export const LogoContainer = styled.div`
  display: flex;
  padding-left: 5%;
`

export const SamlaLogoImg = styled.img`
    display: flex;
    justify-content: center;
    /* display: block;
    margin: 0 auto; */
    height: 40px;
    /* width: 70px; */
    border-radius: 10px;
    
`

export const LinkWrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 5px;
    padding-right: 5%;
    /* width: 100%; */
    `

export const LinkStyles = styled.div`
    /* background-color: yellow; */
    border-radius: 5px;
    padding: 3px;

    /* unvisited link */
    a:link {
      color: #025464;
      text-decoration: none;
    }

    /* visited link */
    a:visited {
      color: #025464;
      text-decoration: none;
    }

    /* mouse over link */
    a:hover {
      color: rgb(229, 124, 35);
      text-decoration: none;
    }

    /* selected link */
    a:active {
      color: #025464;
      text-decoration: none;
    }
`
