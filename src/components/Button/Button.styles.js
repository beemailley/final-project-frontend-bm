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
    background-color: #E57C23;
    color: white;
    
  }

  &:focus {
    outline: 5px solid #E57C23;
  }

  &:active {
    background-color: #e39a1c;
  }

  &:disabled {
    opacity: 0.2;
  }

  ${(props) => props.large && css`
    width: 200px;
    background-color: #E57C23;
  `}
`;

