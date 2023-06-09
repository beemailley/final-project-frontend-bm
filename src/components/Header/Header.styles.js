import styled from 'styled-components';

export const HeaderWrapper = styled.section`
    width: 80%;
    display: flex;
    align-items: center;
    padding-right: 10%;
    padding-left: 10%;
    justify-content: space-between;
    border: 2px red solid;

    @media (max-width: 667px){

    }

    @media (min-width: 668px) and (max-width: 1024px) {

    }
`;

export const LinkWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    h3 {
    max-width: calc(100% / 6);
  }
    `
