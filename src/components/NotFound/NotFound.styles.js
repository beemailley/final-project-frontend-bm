import styled from 'styled-components/macro';

export const WelcomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: #025464;
    position: relative;

    h1 {
        font-size: 55px;
        color: #E57C23;
        filter: invert(10%);
        margin: 60px auto;
    }

    h2 {
        font-size: 20px;
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
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 60px auto;
`
export const SamlaLogoImg = styled.img`
    justify-content: center;
    display: block;
    margin: 10px auto;
    height: 100px;
    width: 100px;
`