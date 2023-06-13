import styled from 'styled-components/macro';

export const ModeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10%;
    margin-bottom: 10%;
    margin-left: 10%;
    /* border: 2px red solid; */
     label {
        font-size: 24px;
        font-weight: bold;
        color: white;
    }
`

export const RegistrationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border: 2px red solid; */
    border-radius: 20px;
    background-color: white;
    margin-left: 10%;
    margin-right: 10%;
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
        margin-left: 10px;
        align-items: baseline;
        

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
        margin-left: 10px;
justify-content: flex-end;
    }`