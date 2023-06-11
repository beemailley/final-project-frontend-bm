import styled from 'styled-components';

export const Introduction = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 2%;

    h1 {
        text-align: center;
    }
`
export const BridgetWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between; // add padding? Or stick with space-evenly?
`
export const BridgetInformation = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 2%;
`

export const FionaWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`
export const FionaInformation = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 2%;
`

export const LinksWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    gap: 5%;
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