import styled from 'styled-components/macro';

export const AllUsersTitle = styled.h2`
  display: flex; 
  justify-content: center;
  text-align: center;
  margin-top: 40px;
  color: #E57C23;
`
export const User = styled.div`
    margin-top: 25px;
`
export const Label = styled.label`
    font-weight: bold;
    color: #025464;
`
export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 25px;
`

export const Arrow = styled.span`
  font-family: 'Material Symbols Outlined';
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  &:before {
    content: '\\e5da'; /* Unicode character for right arrow */
  }
`;
