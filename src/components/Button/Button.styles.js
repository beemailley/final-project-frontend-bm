import styled, { css } from 'styled-components/macro';

export const Button = styled.button`
  background-color: #E8AA42;
  color: black;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 35px;
  width: 120px;
  height: 35px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    /* opacity: 0.7; */
    background-color: #eec277;
  }

  &:focus {
    /* background-color: #e39a1c; */
    outline: 2px solid #025464;
  }

  &:active {
    background-color: #e39a1c;
    
  }

  &:disabled {
    /* background-color: #f9ebd2; */
    opacity: 0.2;
  }

  ${(props) => props.large && css`
    width: 200px;
    background-color: #E57C23;
  `}
`;
