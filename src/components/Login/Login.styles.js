import styled from 'styled-components/macro';

export const ModeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10%;
    margin-bottom: 10%;
    margin-left: 10%;
     label {
        font-size: 24px;
        font-weight: bold;
        color: white;
    }
`
export const UsernameWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 40px;
    justify-content: flex-end;
    
    label {
        font-size: 16px;
        font-weight: bold;
        color: #025464;
    }
    input {
        border-radius: 20px;
        border: black solid 1px;
        margin-left: 10px;
        justify-content: flex-end;
    }
`

export const EmailAddressWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    justify-content: flex-end;

    label {
        font-size: 16px;
        font-weight: bold;
        color: #025464;
    }
    input {
        border-radius: 20px;
        border: black solid 1px;
        margin-left: 10px;
        justify-content: flex-end;
    }
`
export const PasswordWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 40px;
    justify-content: flex-end;

    label {
        font-size: 16px;
        font-weight: bold;
        color: #025464;
    }
    input {
        border-radius: 20px;
        border: black solid 1px;
        margin-left: 10px;
        justify-content: flex-end;
    }
    `

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 40px;
`;
