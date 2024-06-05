import styled from 'styled-components';

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