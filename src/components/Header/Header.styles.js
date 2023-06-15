import styled from 'styled-components/macro';

export const HeaderWrapper = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #F8F1F1;
`;

export const LogoContainer = styled.div`
  display: flex;
  padding-left: 5%;
`

export const SamlaLogoImg = styled.img`
    display: flex;
    justify-content: center;
    height: 40px;
    border-radius: 10px;
    
`

export const LinkWrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 5px;
    padding-right: 5%;
    `

export const LinkStyles = styled.div`
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
