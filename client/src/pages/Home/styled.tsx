import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  height: fit-content;
  justify-content: center;
  align-items: center;

  @media(max-width: 800px){
    grid-template-columns: repeat(1, 1fr);
  }

  @media(min-height: 1000px) and (max-width: 1200px){
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const List = styled.div`
  align-items: center;
  color: #fff;
  overflow-y: auto;
  height: calc(100% - 53px);
  
  ul{
    list-style-type: none;
    max-height: 300px;
  }
  
  @media(min-height: 1500px){
    max-height: 1500px;
  }

  @media(min-height: 1000px){
    max-height: 1000px;
  }
`;

type UserProps = { $status: string };

export const User = styled.li<UserProps> `
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  padding: 5px;
  margin: 5px;
  transition: .5s;

  &:hover{
    background-color: #ffffff34;
  }

  a{
    width: fit-content;

    img{
      width: 50px;
      height: 50px;
      margin-right: 5px;
    }
  }
  
  div{
    display: grid;
    grid-template-columns: repeat(3, 2fr);
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: #fff;
    z-index: 1;

    p, span, h4{
      z-index: -1;
    }

    p{
      display: flex;
      align-items: center;
      font-weight: bold;
    }

    span{
      font-weight: bold;
      color: ${(props) => props.$status === 'late' ? '#f00' : '#0f0'};
      border: 1px solid;
      border-color: ${(props) => props.$status === 'late' ? '#f00' : '#0f0'};
      background-color: ${(props) => props.$status === 'late' ? '#ff000030' : '#00ff0030'};
      padding: 5px;
      border-radius: 10px;
    }

    .changeStatusContainer{
      display: flex;
      align-items: center;
      justify-content: center;

      button{
        background-color: #0000007e;
        color: white;
        font-size: 0px;
        width: fit-content;
        height: fit-content;
        padding: 0;
        margin: 0;
        border: none;
        cursor: pointer;
        transition: .2s linear;
        left: 0;
        right: 0;
      }
  
      .showBtn{
        visibility: visible;
        padding: 5px;
        font-weight: bolder;
        border-radius: 5px;
        border: 1px solid #ffffff7c;
        font-size: 12px;
        text-align: center;
        transition: .2s linear;
      }
    }

    @media(max-width: 1100px){
      font-size: 13px;

      img{
        width: 35px;
        height: 35px;
      }
    }

    @media(max-width: 400px){
      font-size: 11px;

      img{
        width: 30px;
        height: auto;
      }
    }

    @media(min-height: 1500px){
      font-size: 22px;
    }
  }
`;