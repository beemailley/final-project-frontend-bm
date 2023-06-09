import styled from 'styled-components';

export const OuterWrapper = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
    border: 2px solid blue;
`;

export const InnerWrapper = styled.div`
    width: 90vw;
    height: 80vh;
    margin: 0 auto;
    /* border: 2px solid green; */
    border-radius: 20px;
    background-color: #E8AA42;
    margin-top: 10%;

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