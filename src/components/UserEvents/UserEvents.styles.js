import styled from 'styled-components/macro';

export const AllEventsTitle = styled.h2`
  display: flex; 
  justify-content: center;
  text-align: center;
  margin-top: 40px;
  color: #E57C23;
`
export const ButtonContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  margin-top: 20px;
  margin-bottom: 25px;
`
export const CreateEventButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15%;
`

export const Label = styled.label`
    font-weight: bold;
    color: #025464;
`
export const Arrow = styled.span`
  font-family: 'Material Symbols Outlined';
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  &:before {
    content: '\\e5da'; /* Unicode character for right arrow */
  }
`;

export const EventsList = styled.ul`
  display: flex;
  flex-direction: column;  
  justify-content: center;
  list-style-type: none;
`

export const Event = styled.li`
  margin-left: 10px;
`