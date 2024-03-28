import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  height: 100%;
  width: 100%;
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

type UserProps = { $status: 'payed' | 'late' };

export const User = styled.li<UserProps>`
  @keyframes shine{
    0%{
      background: -webkit-linear-gradient(-45deg, #665700, gold, #fff, gold);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    };
    25%{
      background: -webkit-linear-gradient(-45deg, gold, #665700, gold, #fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    };
    50%{
      background: -webkit-linear-gradient(-45deg, #fff, gold, #665700, gold);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    };
    75%{
      background: -webkit-linear-gradient(-45deg, gold, #fff, gold, #665700);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    };
    100%{
      background: -webkit-linear-gradient(-45deg, #665700, gold, #fff, gold);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    };
  }

  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  padding: 5px;
  margin: 5px;
  transition: .3s;

  &:hover{
    background-color: #ffffff45;
  }

  h4{
    display: flex;
    color: '#fff';
    justify-content: center;
  }
  
  h4 p.gold{
    color: #fff;
    animation: shine 1s infinite linear;
    transition: 1s;
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

      &.status{
        justify-content: flex-end;
      }
    }

    span{
      font-weight: bold;
      color: ${(props) => props.$status === 'late' ? '#a7a7a7' : '#0f0'};
      border: 1px solid;
      border-color: ${(props) => props.$status === 'late' ? '#a7a7a7' : '#0f0'};
      background-color: ${(props) => props.$status === 'late' ? '#0000002e' : '#00ff0030'};
      padding: 5px;
      border-radius: 10px;
    }

    p.bottom{
      font-weight: normal;
      font-size: 0;
      transition: .2s;
      width: 100%;

      &.show{
        font-size: 13px;
        transition: .2s;
      }
    }

    .changeStatusContainer{
      display: flex;
      align-items: center;
      justify-content: flex-end;

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
        transition: .2s;
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
        transition: .2s;
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

export const SearchResult = styled.div`
  padding: 10px;
  border: 2px solid #fff;
  width: 100%; 
  height: 500px;
  max-height: 500px;
  grid-column: 2 / span 1;

  h1{
  font-size: 40px;
  color: #fff;
  }
`;