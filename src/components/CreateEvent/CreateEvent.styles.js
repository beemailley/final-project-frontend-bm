import styled from 'styled-components/macro';

export const EventName = styled.h2`
  display: flex; 
  justify-content: center;
  margin-top: 40px;
  color: #E57C23;
`
export const Event = styled.div`
  padding: 20px 10px;
`

export const CreateEventWrapper = styled.form`
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
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 5px;
`
