import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  height: 100%;

  @media(max-width: 720px){
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const List = styled.div`
  color: #fff;

  ul{
    list-style-type: none;
  }
`;

type UserProps = { status: string }

export const User = styled.li<UserProps>`
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  padding: 5px;
  margin: 5px 0;
  transition: .5s;

  &:hover{
    background-color: #ffffff34;
  }

  img{
    width: 50px;
    height: 50px;
    margin-right: 5px;
  }
  
  a{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: #fff;

    p{
      display: flex;
      font-weight: bold;
    }

    span{
      font-weight: bold;
      color: ${(props) => props.status === 'late' ? '#f00' : '#0f0'};
    }

    @media(max-width: 1100px){
      font-size: 13px;

      img{
        width: 35px;
        height: 35px;
      }
    }
  }
`;