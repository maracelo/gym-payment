import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 70px;
  color: #fff;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  border-top: 2px solid #fff;
`;

export const Links = styled.img`
  height: 30px;
  width: 30px;
  cursor: pointer;
  background-color: #ffffff76;
  padding: 3px;
  margin: 0 3px;
  filter: grayscale(1);

  &:hover{
    background-color: #fff;
  }
`;