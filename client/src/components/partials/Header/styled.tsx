import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 70px;
  color: #fff;
`;

export const Header = styled.header`
  @keyframes loadingAnim{
    0%{
      background-image: -webkit-linear-gradient(left, #ffffff9e, transparent);
    }
    50%{
      background-image: -webkit-linear-gradient(left, transparent, #ffffff9e, #ffffff9e, transparent);
    }
    100%{
      background-image: -webkit-linear-gradient(left, transparent, #ffffff9e);
    }
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #fff;
  
  a{
    text-decoration: none;
  }

  nav{
    display: grid;
    grid-auto-flow: column;
    gap: 10px;
    align-items: center;
    width: calc(fit-content + 10px);

    img{
      display: inline-block;
      transform: translateZ(0);
    }
  }

  .loading{
    background-color: transparent;
    background-image: -webkit-linear-gradient(left, #fff, transparent);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    animation: .5s loadingAnim infinite linear;
  }
`;

export const Dark = styled.img`
  height: 30px;
  width: 30px;
  cursor: pointer;
  background-color: #fff;
  padding: 3px;
  border-radius: 50%;
`;

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

type LogedAdminBoxProps = { $dark: 'true' | 'false' };

export const LogedAdminBox = styled.div<LogedAdminBoxProps>`
  width: fit-content;
  height: fit-content;

  div{
    background-color: ${(props) => props.$dark === 'true' ? '#fff' : '#000'};
    color: ${(props) => props.$dark === 'true' ? '#000' : '#fff'};
    width: fit-content;
    height: fit-content;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    text-align: center;
    align-items: center;
    position: absolute;
    font-size: 15px;
    margin-left: -10px;
    margin-top: 16px;
    z-index: 1;
    transition: .1s;
    transform: translate(-100%, 0);

    p{
      white-space: nowrap;
      padding: 5px;
      margin: 5px;
      cursor: pointer;
      transition: .2s;
    }

    a{
      color: inherit;
      width: 100%;
      height: 100%;
      cursor: default;
    }
    
    p:hover{
      background-color: ${(props) => props.$dark === 'true' ? '#000000a1' : '#ffffffa1'};
      color: ${(props) => props.$dark === 'true' ? '#fff' : '#000'}
    }
  }

  .hidden{
    font-size: 0px;
    
    p{
      margin: 0px;
      padding: 0px;
      transition: padding .5s, margin .5s;
    }
  }
`;