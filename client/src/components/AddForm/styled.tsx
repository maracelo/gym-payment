import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 53px);
  
  img{
    width: 40px;
    height: auto;
    clip-path: circle(50% at 50% 50%);
  }

  form{
    display: flex;
    flex-direction: column;
    margin: 10px;
    width: 60%;

    input{
      margin-bottom: 10px;
      padding: 10px;
    }

    input[type=checkbox]{
      display: flex;
      align-items: center;
      margin: 0;
      margin-right: 5px;
    }

    label{
      display: flex;
      align-items: center;
      color: #fff;
      font-weight: bold;
      margin-bottom: 10px;
    }
  
    button{
      background-color: #2c60a5;
      color: #fff;
      font-weight: bold;
      font-size: 20px;
      padding: 10px;
      border: none;
      outline: none;
      cursor: pointer;
      transition: .5s;
      border-radius: 10px;
    }
    
    button:hover{
      transform: scale(1.1);
      border-radius: 0px;
    }

    @media(max-width: 1100px){
      button{
        font-size: 15px;
      }
    }
    
    @media(max-width: 720px){
      width: 100%;
      
      input{
        margin-bottom: 8px;
        padding: 5px;
      }

      label{
        font-size: 12px;
        margin-bottom: 8px;
      }
    }

    @media(max-width: 400px){
      input{
        padding: 5px;
        font-size: 12px;
      }

      button{
        font-size: 14px;
      }
    }

    @media(min-height: 1500px){
      input{
        font-size: 20px;
      }

      button{
        font-size: 22px;
      }
    }
  }
`;

type Props = { type: 'warning' | 'err' };

export const Warning = styled.p<Props>`
  background-color: #0000007d;
  color: ${({ type }) => type === 'err' ? '#ac0000' : '#008000'};
  border-radius: 10px;
  padding: 5px;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid ${({ type }) => type === 'err' ? 'red' : 'green'}
`;