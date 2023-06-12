import styled from 'styled-components';

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: #F8F1F1;
    margin-top: 10%;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 10%;


`
export const Introduction = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 2%;
`

export const TitleAboutUs = styled.h1`
    text-align: center;
    color: #FFFFFF;
    margin-top: 10%;
    font-size: 30px;
`
export const BridgetWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly; // add padding? Or stick with space-evenly?
`
export const BridgetInformation = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 2%;

    h2 {
        color: #FF5722;
    }
`

export const FionaWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const FionaInformation = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 2%;

    h2 {
        color: #FF5722;
    }
`

export const LinksWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    gap: 5%;
`
export const CoffeeIconContainer = styled.div`
    display: flex;
    justify-content: center;
    display: none;
`
export const CoffeeIcon = styled.img`
    height: 50%;
    width: 50%;
`
export const Icon = styled.img`
    width: 20px;
    height: 20px;
    object-fit: cover;

    &:hover {
    transform: scale(1.2);
    }
    `

export const ImgContainerBridget = styled.div`
    display: flex;
    align-items: center;
    /* justify-content: center; */
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
`