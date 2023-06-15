import styled from 'styled-components/macro';

export const CreateEventWrapper = styled.div`
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
  margin-bottom: 25px;
`
