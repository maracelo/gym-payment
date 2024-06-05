import styled from 'styled-components';

export const LogedAdminIcon = styled.img`
  background-color: #fff;
  width: 30px;
  height: 30px;
  border: 3px solid #fff;
  border-radius: 50% 0% 0% 0%;
  cursor: pointer;
  transition: border-radius .5s;
  
  &.closed{
    border-radius: 50%;
    transition: border-radius .5s;
  }
`;