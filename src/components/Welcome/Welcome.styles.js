import styled from 'styled-components';

export const WelcomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: #025464;
    position: relative;

    h1 {
        font-size: 55px;
        /* color: white; */
        color: #E57C23;
        filter: invert(10%);

    }

    h2 {
        font-size: 20px;
        /* color: #EFB17B; */
        /* color: #E57C23;
        filter: invert(10%); */
        color: white;

    }
   `
export const BrandContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 40px;
`

// export const CoffeeMugsImg = styled.img`
//     height: 400px;
//     width: 500px;

// `
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 120px;
    /* position: absolute;
    bottom: 15%;
    left: 15%; */
`
export const SamlaLogoImg = styled.img`
    justify-content: center;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
    height: 50px;
    width: 50px;
    filter: invert(100%);
    /* color: #E57C23;
        filter: invert(10%); */

    /* color: #F8F1F1; */
    /* border-radius: 10px; */

    /* @media (min-width: 668px) and (max-width: 1024px) {
        height: 350px;
        width: 400px;
        margin-top: 10%;

    }
    @media (min-width: 1025px) {
        width: 80vw;
        max-width: 600px;
        margin-top: 2%;

    } */

`