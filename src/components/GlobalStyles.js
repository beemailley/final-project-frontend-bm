import styled from 'styled-components/macro';

export const OuterWrapper = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const InnerWrapper = styled.div`
    width: 90vw;
    height: 80vh;
    margin: 5% auto;
    border-radius: 20px;
    background-color: #025464;
    overflow-y: auto;

    @media (min-width: 668px) and (max-width: 1024px) {
        width: 85vw;
        max-width: 500px;
        margin-top: 5%;

    }
    @media (min-width: 1025px) {
        width: 80vw;
        max-width: 600px;
        margin-top: 2%;

    }
`

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: white;
    margin: 10%;

`