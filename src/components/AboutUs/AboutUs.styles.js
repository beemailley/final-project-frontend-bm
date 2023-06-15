import styled from 'styled-components/macro';

export const Introduction = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5% 5% 0 5%;
`

export const TitleAboutUs = styled.h2`
  display: flex; 
  justify-content: center;
  margin-top: 40px;
  color: #E57C23;
  filter: invert(10%);

`

export const AboutUsInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 5% 5% 5%;
`
export const BridgetWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2px;
`
export const BridgetInformation = styled.div`
    display: flex;
    flex-direction: column;
    text-align: justify;

    h2 {
        color: #FF5722;
    }
`

export const FionaWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2px;
`
export const FionaInformation = styled.div`
    display: flex;
    flex-direction: column;
    text-align: justify;

    h2 {
        color: #FF5722;
    }
`

export const LinksWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px;
    gap: 5%;
    justify-content: ${(props) => props.justify || 'center'};
    align-items: center;
`

export const LinkStyles = styled.div`
    background-color: #025464;
    border-radius: 5px;
    padding: 3px 6px;

    /* unvisited link */
    a:link {
      color: #f8f1f1;
      text-decoration: none;
    }

    /* visited link */
    a:visited {
      color: #f8f1f1;
      text-decoration: none;
    }

    /* mouse over link */
    a:hover {
      color: #e8aa42;
      text-decoration: none;
    }

    /* selected link */
    a:active {
      color: #f8f1f1;
      text-decoration: none;
    }
`
export const SamlaLogoImg = styled.img`
    justify-content: center;
    display: block;
    margin: 10px auto;
    height: 50px;
    width: 50px;
    border-radius: 10px;
`

export const ImgContainerBridget = styled.div`
    display: flex;
    align-items: center;
`

export const ImgContainerFiona = styled.div`
    display: flex;
    align-items: center;
`

export const Img = styled.img`
    border-radius: 50%;
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin: 5px;
`
export const Icon = styled.img`
    width: 20px;
    height: 20px;
    object-fit: cover;

    &:hover {
    transform: scale(1.2);
    }
    `