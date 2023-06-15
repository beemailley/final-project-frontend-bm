import styled from 'styled-components/macro';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
`

export const EditButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  padding: 0 0 5% 0;;
`

export const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 5px;
`

export const ProfileName = styled.h2`
  display: flex; 
  justify-content: center;
  margin-top: 40px;
  color: #E57C23;
  filter: invert(10%);
`

export const Profile = styled.div`
  padding: 20px 10px;
`

export const Label = styled.label`
    font-weight: bold;
    color: #025464;
`

export const EditProfile = styled.form`
 display: flex;
 flex-direction: column;
 padding: 10%;

    label {
        font-size: 16px;
        font-weight: bold;
        color: #025464;
        margin-bottom: 5px;
    }
    input, select {
        border-radius: 20px;
        border: black solid 1px;
        margin-bottom: 10px;
        justify-content: flex-end;        

    }
`

export const ValidationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2%;
`
export const ReturnRequest = styled.h2`
  display: flex;
  text-align: center;
  color: #E57C23;
  filter: invert(10%);
`

export const CountrySelect = styled.select`
  max-width: 200px;
`