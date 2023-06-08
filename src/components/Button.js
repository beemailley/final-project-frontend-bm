import React from 'react'
import styled from 'styled-components';

export const StyledButton = styled.button`
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
`;

export const Button = ({ text }) => {
  return (
    <StyledButton>{text}</StyledButton>
  );
};