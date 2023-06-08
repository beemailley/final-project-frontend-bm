import React from 'react'
import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: ${(props) => (props.submit ? '#E8AA42' : 'blue')};
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
    background-color: #eec277;
  }

  &:focus {
    background-color: #e39a1c;
    outline: 5px solid #025464;
  }

  &:active {
    background-color: #e39a1c;
  }

  &:disabled {
    background-color: #f9ebd2;
    color: #808080;
  }
`;

export const Button = ({ text, submit }) => {
  return (
    <StyledButton submit={submit}>{text}</StyledButton>
  );
};