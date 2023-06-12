import styled from 'styled-components';

export const WelcomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: #F8F1F1;
    position: relative;

    h1 {
        font-size: 55px;
        color: #025464;
    }

    h2 {
        font-size: 20px;
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

export const CoffeeMugsImg = styled.img`
    height: 400px;
    width: 500px;

`
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 15%;
    left: 15%;
`
// export const SamlaLogoImg = styled.img`
//     justify-content: center;
//     display: block;
//     margin: 0 auto;
//     margin-top: 10%;
//     height: 220px;
//     width: 270px;
//     border-radius: 10px;

//     @media (min-width: 668px) and (max-width: 1024px) {
//         height: 350px;
//         width: 400px;
//         margin-top: 10%;

//     }
//     @media (min-width: 1025px) {
//         width: 80vw;
//         max-width: 600px;
//         margin-top: 2%;

//     }

// `