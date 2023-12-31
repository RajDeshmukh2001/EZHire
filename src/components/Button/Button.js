"use client";

import { styled } from 'styled-components';

const Button = ({ value }) => {
  return (
    <Btn><span></span>{value}</Btn>
  )
};

const Btn = styled.button`
  padding: 8px 14px;
  font-size: 15px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  background-color: transparent;
  color: ${({ theme }) => theme.mainColor};
  border: 1px solid ${({ theme }) => theme.mainColor};
  border-radius: 0;
  transition: 0.6s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.mainColor};
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
  }

  @media screen and (max-width: 770px) {
    padding: 6px 12px;
    font-size: 14px;
  }

  @media screen and (max-width: 480px) {
    padding: 5px 10px;
    font-size: 12px;
  }

`;

export default Button;