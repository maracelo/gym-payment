import styled from "styled-components";

export const SearchBarIcon = styled.img`
  background-color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;
  margin-left: -25px;
  transition: .3s;
  transition-delay: .1s;
  
  &.show{
    border-radius: 0 50% 50% 0;
  }
`;

export const SearchBar = styled.input`
  width: 0px;
  height: 30px;
  border: none;
  outline: none;
  transition: .3s width;

  &.show{
    width: 150px;
    height: 30px;
    margin-left: 25px;
    transition: .3s width;
    padding: 3px;
  }
`;

export const NoResult = styled.p`
  position: absolute;
  color: #fff;
  margin-left: 25px;
  margin-bottom: -50px;
`;